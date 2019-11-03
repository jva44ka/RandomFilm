import React from 'react';
import FilmComponent from '../FilmComponent';
import apiService from '../../services/FilmApiService'

import './mainPage.css'

export  default class MainPage extends  React.Component{

    api = new apiService();

    render(){
        return (
            <div className="main-page-grid">
                <label>
                    Здесь вы можете подобрать фильм для себя несколькими способами.
                </label>
                <label>
                    Способ №1: Вам выдается совершенно случайный фильм из базы данных.
                </label>
                <label>
                    Способ №2: Вам выдается фильм в соответствие с вашими предпочтению по жанрам, длительности и т.д. Необходимо зарегестрироваться/ войти
                    для данного способа (<b>В разработке!</b>)
                </label>
                <FilmComponent FilmSelectFunc={this.api.GetRandomFilm}/>
                <FilmComponent FilmSelectFunc={this.api.GetFilmById}/>
            </div>
        )
    }
}