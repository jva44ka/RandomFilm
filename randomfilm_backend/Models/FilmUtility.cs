using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace randomfilm_backend.Models
{
    /// <summary>
    /// Утилитарный класс для манипуляций с фильмом только уже с контекстом всей бд
    /// </summary>
    public static class FilmSelection
    {
        static RandomFilmDBContext db = new RandomFilmDBContext();

        /// <summary>
        /// Метод, возвращающий рандомный фильм из коллекции, переданной в параметр
        /// </summary>
        /// <returns>Возвращаемый фильм</returns>
        public static async Task<Film> GetRandomFilmAsync()
        {
            return await Task.Run(() => { return GetRandomFilm(); });
        }

        public static Film GetRandomFilm()
        {
            Film[] filmsCache = db.Films.ToArray();
            int index = new Random().Next(0, filmsCache.Length);
            return filmsCache.ElementAt(index);
        }

        public static async Task<Film> GetSpecificityFilmAsync(Account account)
        {
            return await Task.Run(() => { return GetSpecificityFilm(account); });
        }

        public static Film GetSpecificityFilm(Account account)
        {
#warning Тут сгенерировать фильм по алгоритму. Данные есть в параметрах
            return GetRandomFilm();
        }

#warning Костыль
        /// <summary>
        /// Готовит такие свойства фильма как жанры, лайки, комментарии (т.к. навигационные свойства, сгенерированные EF, пустые)
        /// </summary>
        /// <returns></returns>
        public static Film GetPreparedFilm(Film sourceFilm)
        {
            // Подготовка genres
            FilmsGenres[] filmsGenres = db.FilmsGenres.Where(x => x.FilmId == sourceFilm.Id).ToArray();
            Genre[] genresCache = db.Genres.ToArray();
            List<Genre> genres = new List<Genre>();
            for (int i = 0; i < filmsGenres.Length; i++)
            {
                genres.Add(genresCache.FirstOrDefault(x => x.Id == filmsGenres[i].GenreId));
            }

            return sourceFilm;
        }
    }
}
