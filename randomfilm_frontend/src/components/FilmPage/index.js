import React from 'react';
import FilmApiService from '../../services/FilmApiService'

import './styles.css'

export  default class FilmsPage extends  React.Component{

    apiService = new FilmApiService();

    state = {
        film: {},
        like: {},
        comments: []
    };

    componentDidMount = async() => {
        //this.setState({film: this.apiService.selectedFilm});
        this.setState({film: this.apiService.getSelectFilm()});
        console.log(this.state.film);
        console.log(this.apiService.selectedFilm);
    }

    likeClick = async(event) => {
        this.setState({
            searchText: event.target.value,
            films: this.films.filter((item) => (item.title.toLowerCase().includes(event.target.value.toLowerCase())))
        })
    }

    dislikeClick = async() => {

    }

    render = () => {
        return (<div>
                {this.state.film ? (
                    <div className="film-page">
                        <label id="TitleValue">{this.state.film.title}</label>
                        <label id="FilmTrailerLabel">Трейлер</label>
                        <label id="FilmTrailerValue">{this.state.film.urlTrailer}</label>
                        <label id="GenreLabel">Жанр</label>
                        <label id="GenreValue">{this.state.film.genre}</label>
                        <label id="DescriptionLabel">Опсиание</label>
                        <label id="DescriptionValue">{this.state.film.description}</label>
                        <label id="DuarationLabel">Длительность</label>
                        <label id="DuarationValue">{this.state.film.duration}</label>
                        <label id="YearLabel">Год</label>
                        <label id="YearValue">{this.state.film.year}</label>
                        <label id="DirectorLabel">Продюссер</label>
                        <label id="DirectorValue">{this.state.film.director}</label>
                    </div>
                ):(
                    <div className="film-page">

                    </div>
                )}
            </div>
        );
    }
}