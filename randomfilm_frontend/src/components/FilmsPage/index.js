import React from 'react';
import RandomFilmView from './Random-film-view';

export  default class MainPage extends  React.Component{

    render(){
        return (
            <div className="main-page-grid">
                <RandomFilmView/>
            </div>
        )
    }
}