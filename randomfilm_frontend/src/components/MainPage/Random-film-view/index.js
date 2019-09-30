import React from 'react';
import ApiService from '../../../services/FilmApiService';

import './RandomFilmView.css';

export  default class RandomFilmView extends  React.Component{

    api = new ApiService();

    state={
        id:     null,
        title:  null,
        duration:   null,
        genre:  null,
        description: null,
        year:   null,
        director:   null,
        urlImg:     null,
        urlTrailer: null,
        showed: false
    };

    onButtonClick = () => {
        //Работющий запрос
        fetch("http://localhost:64303/api/Films/Random", {
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
            )

        /*const data = this.api.getRandomFilm();
        this.setState((state) => {
                return{
                    id:     data.id,
                    title:  data.title,
                    duration:   data.duaration,
                    genre:  data.genre,
                    description: data.description,
                    year:   data.year,
                    director:   data.director,
                    urlImg:     data.urlImg,
                    urlTrailer: data.urlTrailer
                }
        });*/
    }

    render(){
        return (
            <div className="randomFilmComponent">
                <image id="FilmImage" src={this.state.urlImg}/>
                <video id="FilmTrailerVideo" src={this.state.urlTrailer}/>
                <label id="TitleLabel">Название</label>
                <label id="TitleValue">{this.state.title}</label>
                <label id="GenreLabel">Жанр</label>
                <label id="GenreValue">{this.state.genre}</label>
                <label id="DescriptionLabel">Опсиание</label>
                <label id="DescriptionValue">{this.state.description}</label>
                <label id="DuarationLabel">Длительность</label>
                <label id="DuarationValue">{this.state.duaration}</label>
                <label id="YearLabel">Год</label>
                <label id="YearValue">{this.state.year}</label>
                <label id="DirectorLabel">Продюссер</label>
                <label id="DirectorValue">{this.state.director}</label>
                <button id="GetFilmButton" onClick={this.onButtonClick} >Получить фильм</button>
            </div>
        )
    }
}