using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace randomfilm_backend.Models
{
    public class KnnAlgorithmUtility
    {
        /// <summary>
        /// Высчитывает все жанры и соответствующие им ффильмы из коллекции в параметре
        /// </summary>
        /// <param name="films">Исходные фильмы</param>
        /// <returns>Хеш таблица вида "жанр, массив фильмов с этим жанром"</returns>
        private Dictionary<string, Film[]> GetGenres(Film[] films)
        {
            List<string> genres = new List<string>();

            var dic = new Dictionary<string, Film[]>();
            return null;
        }
    }
}
