﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace randomfilm_backend.Models
{
    public static class KnnAlgorithmUtility
    {
        // Количество ближайших соседей
        private const int k = 3;

        private static RandomFilmDBContext db = new RandomFilmDBContext();

        private static Account[] accountsCache;
        private static Genre[] genresCache;
        private static FilmsGenres[] filmsGenresCache;
        private static Film[] filmsCache;
        private static Like[] likesCache;

        /// <summary>
        /// Публичный метод для 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Film GetFilm(Account user)
        {
            Film result;

            // 0. Вытаскивыние базы в кеш
            accountsCache = db.Accounts.ToArray();
            genresCache = db.Genres.ToArray();
            filmsCache = db.Films.ToArray();
            filmsGenresCache = db.FilmsGenres.ToArray();
            likesCache = db.Likes.ToArray();

            /* 1. Нахождение для каждого пользователя (кроме того, для которого подбираем фильм) 
                 среднего значения в каждой метрике (жанр 1, жанр 2, ..., жанр n)*/

            Dictionary<Account, double[]> vectors = new Dictionary<Account, double[]>();
            for (int i = 0; i < accountsCache.Length; i++)
            {
                if (user.Id == accountsCache[i].Id)
                    continue;
                vectors.Add(accountsCache[i], GetAveregeLikes(accountsCache[i]));
            }

            /* 2. Нахождение для нашего пользователя средних оценок (жанр 1, жанр 2, ..., жанр n)*/
            double[] userVector = GetAveregeLikes(user);

            /* 3. Расчет расстояния других пользователей до нашего пользователя в 
             * многомерной системе жанров, сортировка по дистанциям */
            Dictionary<Account, double> distances = GetDistances(user, userVector, vectors).
                OrderBy(x => x.Value).ToDictionary(x => x.Key, x => x.Value);

            /* 4. Выбор ближайших соседей */
            Dictionary<Account, double> nearestToUser = distances.Take(KnnAlgorithmUtility.k).ToDictionary(x => x.Key, x => x.Value);

            /* 5. Выборка фильма для пользователя */
            result = GetFilm(user, nearestToUser);

            return result; ;
        }

        /// <summary>
        /// Подсчитывает среднюю оценку каждой метрике (все жанры) поставленую конкретным пользователем
        /// </summary>
        /// <param name="account">Пользователь, для которого расчитываются средние значения оценок</param>
        /// <returns></returns>
        private static double[] GetAveregeLikes(Account account)
        {
            double[] methrics = new double[genresCache.Length + 1];
            // Посчитываем средние значения оценки для каждого жанра
            for (int i = 0; i < genresCache.Length; i++)
            {
                methrics[i] = GetAveregeLikeInGenre(account, genresCache[i]);
            }
            return methrics;
        }

        /// <summary>
        /// Подсчитывает среднюю оценку конкретного пользователя в конкретном жанре фильмов
        /// </summary>
        /// <param name="account">Пользователь</param>
        /// <param name="genre">Жанр</param>
        /// <returns></returns>
        private static double GetAveregeLikeInGenre(Account account, Genre genre)
        {
#warning Я этот метот писал ночью и у меня были нереальные затупы, могут быть ошибки. Очень опасный метод
            double result;
            double summOfLikes = 0;
            double numberOfLikes = 0;

            //Находим фильмы с нужным нам жанром
            FilmsGenres[] filmsGenres = filmsGenresCache.Where(x => x.GenreId == genre.Id).ToArray();
            List<Film> filmsWithNeededGenre = new List<Film>();
            foreach (var item in filmsGenres)
            {
                filmsWithNeededGenre.Add(filmsCache.FirstOrDefault(x => x.Id == item.FilmId));
            }

            //Находим все лайки пользователя фильмам данного жанра
            List<Like> likes = likesCache.Where(x => x.AccountId == account.Id).ToList();
            Like like;
            foreach (var film in filmsWithNeededGenre)
            {
                like = likes.FirstOrDefault(x => x.FilmId == film.Id);
                if (like != null)
                {
                    likes.Add(like);
                }
            }

            /// Ищем средний балл по жанру
            // Ищем число лайков
            numberOfLikes = likes.Count;

            // Ищем сумму лайков
            foreach (var item in likes)
            {
                if (item.LikeOrDislike)
                    summOfLikes++;
                else
                    summOfLikes--;
            }

            // Ищем среднее
            if (numberOfLikes != 0)
                result = summOfLikes / numberOfLikes;
            else
                result = summOfLikes;

            return result;
        }

        /// <summary>
        /// Расчитывает расстояния других пользователей до конкретного в многомерном пространстве лайков
        /// </summary>
        /// <param name="user">Пользователь, расстояние до которого ищется от других пользователей</param>
        /// <param name="userMethrics">Средние значения (метрики) пользователя, до которого исчется расстояния</param>
        /// <param name="methrics">Пары "пользователь-средние оценки" других пользователей</param>
        /// <returns>Пары "пользователь-дистанция до исходного пользователя"</returns>
        private static Dictionary<Account, double> GetDistances(Account user, double[] userMethrics, Dictionary<Account, double[]> methrics)
        {
            Dictionary<Account, double> result = new Dictionary<Account, double>();
            //Буферная переменная
            double summDistances = 0;
            for (int i = 0; i < methrics.Count; i++)
            {
                summDistances = 0;
                for (int k = 0; k < methrics.Values.ElementAt(i).Length ; k++)
                {
                    summDistances += (userMethrics[k] - methrics.Values.ElementAt(i).ElementAt(k)) *
                                        (userMethrics[k] - methrics.Values.ElementAt(i).ElementAt(k));
                }
                result.Add(methrics.Keys.ElementAt(i), Math.Sqrt(summDistances));
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
        private static Film GetFilm(Account user, Dictionary<Account, double> nearestToUser)
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
                                    x.AccountId == nearestToUser.Keys.ElementAt(k).Id);
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
#warning Исключение: пустое множество
            Film result = filmsLikes.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value).Keys.First();
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
