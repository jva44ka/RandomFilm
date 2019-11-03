using System;
using System.Collections.Generic;

namespace randomfilm_backend.Models
{
    public partial class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public TimeSpan? Duration { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public DateTime? Year { get; set; }
        public string Director { get; set; }
        public string UrlImg { get; set; }
        public string UrlTrailer { get; set; }

        /// <param name="id">ID</param>
        /// <param name="title">Название</param>
        /// <param name="duration">Длительность</param>
        /// <param name="genre">Жанр</param>
        /// <param name="description">Описание</param>
        /// <param name="year">Год выхода</param>
        /// <param name="director">Режиссер</param>
        /// <param name="urlImg">Ссылка на превью</param>
        /// <param name="urlTrailer">Ссылка на трейлер youtube</param>
        public Film(int id, string title, TimeSpan? duration, string genre, string description,
            DateTime? year, string director, string urlImg, string urlTrailer)
        {
            this.Id = id;
            this.Title = title;
            this.Duration = duration;
            this.Genre = genre;
            this.Description = description;
            this.Year = year;
            this.Director = director;
            this.UrlImg = urlImg;
            this.UrlTrailer = urlTrailer;
        }
    }
}
