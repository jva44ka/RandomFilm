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
        /// <summary>
        /// Метод, возвращающий рандомный фильм из коллекции, переданной в параметр
        /// </summary>
        /// <param name="repository">Коллекция фильмов</param>
        /// <returns>Возвращаемый фильм</returns>
        public static async Task<Film> GetRandomFilmAsync(IEnumerable<Film> repository)
        {
            return await Task.Run(() => { return GetRandomFilm(repository); });
        }

        public static Film GetRandomFilm(IEnumerable<Film> repository)
        {
            Random rand = new Random();
            int index = rand.Next(0, repository.Count());
            return repository.ElementAt(index);
        }

        public static Film GetFilmFromJson(string film)
        {
            XmlDocument node = JsonConvert.DeserializeXmlNode(film);

            Film result = new Film(
                int.Parse(node.ChildNodes[0].Value), 
                node.ChildNodes[1].Value, 
                TimeSpan.Parse(node.ChildNodes[2].Value),
                node.ChildNodes[3].Value, 
                node.ChildNodes[4].Value, 
                DateTime.Parse(node.ChildNodes[5].Value),
                node.ChildNodes[6].Value, 
                node.ChildNodes[7].Value, 
                node.ChildNodes[8].Value);
            return result;
        }
    }
}
