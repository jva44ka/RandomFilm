import React from 'react';
import ApiService from '../../services/FilmApiService';

import './FilmFullView.css';

    /*onButtonClick = () => {
        //Работющий запрос
        /*fetch(this.props.qwerry, {
            method: 'GET',
            mode: 'cors'})

            .then(res => res.json())
            .then((result) => {
                    this.setState({
                            id: result.id,
                            title: result.title,
                            duration: result.duration,
                            genre: result.genre,
                            description: result.description,
                            year: result.year,
                            director: result.director,
                            urlImg: result.urlImg,
                            urlTrailer: result.urlTrailer,
                            showed: true
                    });
                    console.log(result);
                    console.log(this.state);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )*//*
        const result = this.api.GetRandomFilm();
        console.log(result);
        this.setState({
            id: result.id,
            title: result.title,
            duration: result.duration,
            genre: result.genre,
            description: result.description,
            year: result.year,
            director: result.director,
            urlImg: result.urlImg,
            urlTrailer: result.urlTrailer,
            showed: true
        });
    }*/

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