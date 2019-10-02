import React from 'react';
import ApiService from '../../services/FilmApiService';

import './FilmView.css';

export  default class FilmView extends  React.Component{

    api = new ApiService();

    state={
        id:     null,
        title:  null,
        duration:   null,
        genre:  null,
        description: null,
        year:   null,
        director:   null,
        urlImg:     null,//'https://www.okino.ua/media/var/news/2019/01/11/avengers-infinity-war-poster.jpg',
        urlTrailer: null,
        showed: false
    };

    onButtonClick = () => {
        //Работющий запрос
        fetch(this.props.qwerry, {
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
    }

    render(){

        return (
            <div>
                {this.state.showed?
                    (
                        <div className="FilmComponent">
                            <div className="FilmComponent-Grid">
                                <img id="FilmImage" src={this.state.urlImg}/>
                                <label id="FilmTrailerLabel" > Трейлер </label>
                                <label id="FilmTrailerValue">{this.state.urlTrailer}</label>
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
                            </div>
                            <div className="FilmComponent-Flex">
                                <button id="GetFilmButton" onClick={this.onButtonClick}>Еще фильм</button>
                            </div>
                        </div>
                    ):(
                        <div className="FilmComponent-Flex">
                            <button id="GetFilmButton" onClick={this.onButtonClick}>Получить фильм</button>
                        </div>
                    )
                }
            </div>
        )
    }
}