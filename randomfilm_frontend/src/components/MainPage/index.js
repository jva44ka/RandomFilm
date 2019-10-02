import React from 'react';
import FilmView from '../Film-view';
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
                <labe>
                    Способ №1: Вам выдается совершенно случайный фильм из базы данных.
                </labe>
                <labe>
                    Способ №2: Вам выдается фильм в соответствие с вашими предпочтению по жанрам, длительности и т.д. Необходимо зарегестрироваться/ войти
                    для данного способа (<b>В разработке!</b>)
                </labe>
                <FilmView qwerry="http://localhost:64303/api/Films/Random"/>
                <FilmView qwerry="http://localhost:64303/api/Films/0"/>
            </div>
        )
    }
}