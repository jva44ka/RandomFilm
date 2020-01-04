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
    /// Утилитарный класс для подбора фильма несколькими способами
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

        public static async Task<Film> SpecificityFilmAsync(Account account)
        {
            return await Task.Run(() => { return SpecificityFilm(account); });
        }

        public static Film SpecificityFilm(Account account)
        {
#warning Тут сгенерировать фильм по алгоритму. Данные есть в параметрах
            return GetRandomFilm();
        }
    }
}
