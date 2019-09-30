import React from 'react';
import ApiService from '../../services/FilmApiService';

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

    /*constructor(){
        super();
        this.updateFilm();

    }*/

    /*updateFilm(){
        this.ApiService
            .getRandomFilm()
            .then(this.onLoadedFilm())
    }*/

    onButtonClick = () => {
        let res = fetch('http://localhost:64303/api/Films/1', {mode: 'no-cors'});
        console.log(res);
        let data = this.api._transformFilm(res);
        console.log(data);



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
        });
    }

    /*onButtonClick = () => {
        const res = fetch('http://localhost:5000/api/Films/Random', {mode: 'no-cors'});

        /*if (!res.ok) {
            throw new Error(`Could not fetch ${this.BasePath}` +
                `, received ${res.status}`)
        }
        const data = this.api._transformFilm(res);
        console.log(data);
        console.log('status is:' + res.status);
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
        });
    }*/

    /*async getFilm(e){
        //Убирает перезагрузку страницы
        e.preventDefault();
        //Запрос к бекенду
        const api_url =  await  fetch(`${BasePath}/api/${Controller}/${Id}`)
            .then(res => res.json())
            .then(body => {
                this.state.setState({
                    id: body.id,
                    title: body.title,
                    duaration: body.duaration,
                    genre: body.genre,
                    description: body.description,
                    year: body.year,
                    director: body.director,
                    urlImg: body.urlImg,
                    urlTrailer: body.urlTrailer
                    }
                )
            })
            .catch(error => console.log(error));
        //const data = await api_url.json();
    }*/


    /*handleClick = () => {
        //Обработчик нажатия
    }*/

    render(){
        //const {id, title, duaration, genre, description, year, director, urlImg, urlTrailer} = this.props;

        return (
            <div className="randomFilmComponent">
                <image id="FilmImage" src={this.state.urlImg}></image>
                <video id="FilmTrailerVideo" src={this.state.urlTrailer}> </video>
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
                <label>Продюссер</label>
                <label>{this.state.director}</label>
                <button id="GetFilmButton" onClick={this.onButtonClick} >Получить фильм</button>
            </div>
        )
    }
}