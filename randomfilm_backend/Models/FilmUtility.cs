using Microsoft.EntityFrameworkCore;
using randomfilm_backend.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace randomfilm_backend.Models
{
    /// <summary>
    /// Утилитарный класс для манипуляций с фильмом только уже с контекстом всей бд
    /// </summary>
    public static class FilmUtility
    {
        static RandomFilmDBContext db = new RandomFilmDBContext();

        /// <summary>
        /// Метод, возвращающий рандомный фильм из коллекции, переданной в параметр
        /// </summary>
        /// <returns>Возвращаемый фильм</returns>
        public static async Task<Film[]> GetRandomFilmAsync()
        {
            //Вытаскиваем бд в кеш
            List<Film> filmsCache = await db.Films
                                .Include(x => x.Likes)
                                .Include(x => x.FilmsGenres)
                                    .ThenInclude(x => x.Genre)
                                .Where(x => x.FilmsGenres.FirstOrDefault(y => y.FilmId == x.Id) != null)
                                .ToListAsync();
            Film[] result = new Film[filmsCache.Count];

            //Буферные переменные для работы с рандомной выборкой и переброса из коллекции в коллекцию
            int filmsCacheCount = filmsCache.Count;
            Random random = new Random();
            Film selectedFilm;

            //Заполнение массива рандомными фильмами
            for (int i = 0; i < filmsCacheCount; i++)
            {
                selectedFilm = filmsCache[random.Next(0, filmsCache.Count)];
                result[i] = selectedFilm;
                filmsCache.Remove(selectedFilm);
            }

            return result;
        }

        public static async Task<List<Film>> GetSpecificityFilmAsync(Account user)
        {
            return await SameUsersAlgorithmUtility.GetFilms(user);
        }
    }
}
