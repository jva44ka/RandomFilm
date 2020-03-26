import React from 'react';
import FilmComponent from './FilmComponent';
import ApiService from '../../services/FilmApiService'

import './styles.css'

export  default class MainPage extends  React.Component{

    apiService = new ApiService();

    state =  {
        isFilmSelected: false
    };

    render(){
        return (
            <div className="main-page-grid">
                <label className="general-instruction-label">
                    Здесь вы можете подобрать фильм для себя несколькими способами.
                </label>
                <label className="secondary-instruction-label">
                    Способ №1: Вам выдается совершенно случайный фильм из базы данных.
                </label>
                <label className="secondary-instruction-label">
                    Способ №2: Вам выдается фильм в соответствие с вашими предпочтениями. Необходимо зарегестрироваться/войти
                    для данного способа.
                </label>
                <FilmComponent FilmSelectFunc={this.apiService.GetRandomFilm}/>
                <FilmComponent FilmSelectFunc={this.apiService.GetSpecifityFilm}/>
            </div>
        )
    }
}