import React from 'react';
//import ApiService from '../../services/FilmApiService';

import './FilmFullView.css';

    const FilmView = ({film, FilmViewClick}) => {
        return (
            <div className="FilmFullComponent" onClick={FilmViewClick}>
                <label id="FilmTrailerLabel" > Трейлер </label>
                <label id="FilmTrailerValue">{film.urlTrailer}</label>
                <label id="TitleLabel">Название</label>
                <label id="TitleValue">{film.title}</label>
                <label id="GenreLabel">Жанр</label>
                <label id="GenreValue">{film.genre}</label>
                <label id="DescriptionLabel">Опсиание</label>
                <label id="DescriptionValue">{film.description}</label>
                <label id="DuarationLabel">Длительность</label>
                <label id="DuarationValue">{film.duaration}</label>
                <label id="YearLabel">Год</label>
                <label id="YearValue">{film.year}</label>
                <label id="DirectorLabel">Продюссер</label>
                <label id="DirectorValue">{film.director}</label>
            </div>
        )
    };

    export  default FilmView;