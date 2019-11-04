using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Newtonsoft.Json;

namespace randomfilm_backend.Models
{
    /// <summary>
    /// Утилитарный класс для обработки данных типа Film или IEnumerable<Film>
    /// </summary>
    public static class FilmUtility
    {
        static RandomFilmDBContext db = new RandomFilmDBContext();

        /// <summary>
        /// Метод, возвращающий рандомный фильм из коллекции, переданной в параметр
        /// </summary>
        /// <param name="repository">Коллекция фильмов</param>
        /// <returns>Возвращаемый фильм</returns>
        public static async Task<Film> GetRandomFilmAsync()
        {
            return await Task.Run(() => { return GetRandomFilm(); });
        }

        public static Film GetRandomFilm()
        {
            Random rand = new Random();
            int index = rand.Next(0, db.Films.Count());
            return db.Films.ElementAt(index);
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
