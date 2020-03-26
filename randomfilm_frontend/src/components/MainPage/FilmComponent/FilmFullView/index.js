import React from 'react';
import getFilmGenres from '../../../../services/genresStringify';

import './styles.css';

    const FilmView = ({film, FilmViewClick}) => {
        let genresString = getFilmGenres(film);
        return (
            <div className="FilmFullComponent" onClick={FilmViewClick}>
                <label id="FilmTrailerLabel" > Трейлер </label>
                <label id="FilmTrailerValue">{film.urlTrailer}</label>
                <label id="TitleLabel">Название</label>
                <label id="TitleValue">{film.title}</label>
                <label id="GenreLabel">Жанр</label>
                <label id="GenreValue">{genresString}</label>
                <label id="DescriptionLabel">Опсиание</label>
                <label id="DescriptionValue">{film.description}</label>
                <label id="DuarationLabel">Длительность</label>
                <label id="DuarationValue">{film.duration}</label>
                <label id="YearLabel">Год</label>
                <label id="YearValue">{film.year}</label>
                <label id="DirectorLabel">Продюссер</label>
                <label id="DirectorValue">{film.director}</label>
            </div>
        )
    };

    export  default FilmView;