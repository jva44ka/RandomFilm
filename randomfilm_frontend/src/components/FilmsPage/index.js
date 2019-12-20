import React from 'react';
import FilmComponent from '../FilmComponent';
import apiService from '../../services/FilmApiService'

import './FilmsPage.css'

export  default class FilmsPage extends  React.Component{

    api = new apiService();

    render(){
        return (
            <div className="films-page-grid">
                <label>
                    Здесь бдет список фильмов
                </label>
            </div>
        )
    }
}