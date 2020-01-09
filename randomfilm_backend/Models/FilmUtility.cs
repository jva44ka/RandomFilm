using Microsoft.EntityFrameworkCore;
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
        public static async Task<Film> GetRandomFilmAsync()
        {
            Film[] films = await db.Films
                                .Include(x => x.Likes)
                                .Include(x => x.FilmsGenres)
                                    .ThenInclude(x => x.Genre)
                                .Where(x => x.FilmsGenres.FirstOrDefault(y => y.FilmId == x.Id) != null)
                                .ToArrayAsync();
            int index = new Random().Next(0, films.Length);
            return films.ElementAt(index);
        }

        public static Film GetRandomFilm()
        {
            Film[] filmsCache = db.Films.ToArray();
            int index = new Random().Next(0, filmsCache.Length);
            return filmsCache.ElementAt(index);
        }

        public static async Task<Film> GetSpecificityFilmAsync(Account user)
        {
            return await SameUsersAlgorithmUtility.GetFilm(user); ;
        }

        //public static Film GetSpecificityFilm(Account user)
        //{
        //    //return KnnAlgorithmUtility.GetFilm(user);
        //    //return SameUsersAlgorithmUtility.GetFilm(user);
        //}
    }
}
