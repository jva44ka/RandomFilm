import React from 'react';
import FilmComponent from '../FilmComponent';
import apiService from '../../services/FilmApiService'

import './FilmsPage.css'

export  default class MainPage extends  React.Component{

    api = new apiService();

    render(){
        return (
            <div className="main-page-grid">
                <label>
                    Здесь бдет список фильмов
                </label>
                <FilmComponent FilmSelectFunc={this.api.GetRandomFilm}/>
                <FilmComponent FilmSelectFunc={this.api.GetFilmById}/>
            </div>
        )
    }
}