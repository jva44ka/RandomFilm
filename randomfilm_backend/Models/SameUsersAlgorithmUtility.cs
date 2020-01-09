using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace randomfilm_backend.Models
{
    /// <summary>
    /// Алгоритм выдачи фильма с учетом предпочтений пользователя
    /// Кратко: алгоритм ищет пользователей с такими же лайкнутыми фильмами. Затем сортирует по количеству совпадений и берет 
    /// какое-то число соседей (k) и смотрит какие у этих соседей общие лайкнутые фильмы, которые не лайкнул исходный пользователь.
    /// Если не находит берет рандомный из лайкнутых соседями но не лайкнутый пользователем.
    /// </summary>
    public static class SameUsersAlgorithmUtility
    {
        // Количество ближайших соседей
        private const int k = 1;

        private static RandomFilmDBContext db = new RandomFilmDBContext();

        private static Account[] accountsCache;
        private static Film[] filmsCache;
        private static Like[] likesCache;

        /// <summary>
        /// Публичный метод для использования данного алгоритма 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static async Task<Film> GetFilm(Account user)
        {
            Film result;

            // 0. Вытаскивыние базы в кеш
            accountsCache = await db.Accounts.Include(x => x.Likes)
                                        .ToArrayAsync();
            filmsCache = await db.Films.Include(x => x.Likes)
                                    .ToArrayAsync();
            likesCache = await db.Likes.Include(x => x.Film)
                                    .ToArrayAsync();

            /* 1. Нахождение для каждого пользователя общих лайков с нашим пользователем*/
            Dictionary<Account, int> usersMatches = GetUsersWithSameLakes(user);

            /* 2. Сортировка по совпадениям лайков и выбор ближайших соседей */
            Dictionary<Account, int> nearestToUser = usersMatches
                .OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value)
                .Take(SameUsersAlgorithmUtility.k).ToDictionary(x => x.Key, x => x.Value);

            /* 3. Выборка фильма для пользователя */
            result = SelectFilm(user, nearestToUser);

            return result; ;
        }

        /// <summary>
        /// Находит рейтинги похожести (общие лайкнутые фильмы) для каждого пользователя относительно искомого пользователя
        /// </summary>
        /// <param name="user">Пользователь, для которого подбирается фильм</param>
        /// <returns>Словарь вида "пользователь"-"количество общих лайков с пользователем для которого подбирается фильм"</returns>
        private static Dictionary<Account, int> GetUsersWithSameLakes(Account user)
        {
            // Ищем лайкнутые фильмы пользователя
            Like[] userLikes = likesCache.Where(x => x.AccountId == user.Id).ToArray();
            List<Film> filmsLikedByUser = new List<Film>();
            for (int i = 0; i < userLikes.Length; i++)
            {
                filmsLikedByUser.Add(filmsCache.FirstOrDefault(x => x.Id == userLikes[i].FilmId));
            }

            // Ищем совпадения лайков с другими пользователями
            Dictionary<Account, int> result = new Dictionary<Account, int>();
            int matches = 0;
            Like sameLike;
            for (int i = 0; i < accountsCache.Length; i++)
            {
                if (accountsCache[i].Id == user.Id)
                    continue;
                for (int k = 0; k < filmsLikedByUser.Count; k++)
                {
                    sameLike = likesCache.FirstOrDefault(x => (x.AccountId == accountsCache[i].Id) && (x.FilmId == filmsLikedByUser[k].Id));
                    if ((sameLike != null) && (sameLike.LikeOrDislike == userLikes[k].LikeOrDislike))
                        matches++;
                }
                result.Add(accountsCache[i], matches);
                matches = 0;
            }
            return result;
        }

        /// <summary>
        /// Выборка фильмов: среди ближайших соседей, исключая фильмы которые оценивал наш пользователь, состовляется
        /// список фильмов и рейтингов этих фильмов. Рейтинг формируется количеством лайков/дизлайков от соседей.
        /// </summary>
        /// <param name="user">Пользователь, для которого подбирается фильм</param>
        /// <param name="nearestToUser">Ближайшие соседи</param>
        /// <returns>Подобраный фильм</returns>
        private static Film SelectFilm(Account user, Dictionary<Account, int> nearestToUser)
        {
            // Выясняем какие фильмы еще не оценивал (соответственно не смотрел) пользователь (посмотрел)
            Film[] notLikedFilmsByUser = GetNotLikedFilmsByUser(user);

            // Вводим счетчик лайков у этих фильмов ближайшими соседями этого пользователя
            Dictionary<Film, int> filmsLikes = new Dictionary<Film, int>();

            // Проходим по фильмам. На каждой итерации собираем рейтинг фильма соседями
            int rating;
            for (int i = 0; i < notLikedFilmsByUser.Length; i++)
            {
                rating = 0;
                for (int k = 0; k < nearestToUser.Keys.Count; k++)
                {
                    Like like = likesCache.FirstOrDefault(x => (x.FilmId == notLikedFilmsByUser[i].Id) &&
                                    (x.AccountId == nearestToUser.Keys.ElementAt(k).Id));
                    if (like != null)
                    {
                        if (like.LikeOrDislike)
                            rating++;

                        else
                            rating--;
                    }
                }
                filmsLikes.Add(notLikedFilmsByUser[i], rating);
            }

            // Сортируем получившийся словарь по убыванию рейтинга и даем первый элемент как результат
            Film result;
            try
            {
                result = filmsLikes.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value).Keys.First();
            }
            catch(System.InvalidOperationException ex)
            {
                result = null;
            }
            return result;

        }

        /// <summary>
        /// Выдает массив фильмов, которым ставил оценки конкретный пользователь
        /// </summary>
        /// <param name="user">конкретный пользовател</param>
        /// <returns>Коллекция оцененных фильмов</returns>
        private static Film[] GetLikedFilmsByUser(Account user)
        {
            Like[] likesByUser = likesCache.Where(x => x.AccountId == user.Id).ToArray();
            List<Film> filmsLikedByUser = new List<Film>();
            foreach (var item in likesByUser)
                filmsLikedByUser.Add(filmsCache.FirstOrDefault(x => x.Id == item.FilmId));

            return filmsLikedByUser.ToArray();
        }

        /// <summary>
        /// Выдает массив фильмов, которым НЕ ставил оценки конкретный пользователь
        /// </summary>
        /// <param name="user">конкретный пользовател</param>
        /// <returns>Коллекция оцененных фильмов</returns>
        private static Film[] GetNotLikedFilmsByUser (Account user)
        {
            Like[] likesByUser = likesCache.Where(x => x.AccountId == user.Id).ToArray();
            List<Film> filmsNotLikedByUser = new List<Film>(filmsCache);
            foreach (var item in likesByUser)
                filmsNotLikedByUser.Remove(filmsCache.FirstOrDefault(x => x.Id == item.FilmId));

            return filmsNotLikedByUser.ToArray();
        }
    }
}
