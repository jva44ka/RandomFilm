import React from 'react';

import {Redirect} from "react-router-dom";

import './styles.css';
import image from './image-not-found.png'
import FilmApiSrvice from '../../../services/FilmApiService'
import genresToString from '../../../services/genresStringify';

export  default  class  FilmListItem extends React.Component {

    apiService = new FilmApiSrvice();

    state = {
        genre: genresToString(this.props.film),
        isFilmSelected: false
    };

    setRedirect = () => {
        this.setState({
            isFilmSelected: true
        })
    };

    renderRedirect = () => {
        if (this.state.isFilmSelected) {
            return <Redirect to='/Film'/>
        }
    };

    filmClickFunc = async (event) => {
        FilmApiSrvice.selectedFilm = this.props.film;
        console.log("Film Id is: " + this.apiService.selectedFilm.id);
        this.setRedirect();
    };

    render = () => {
        return (
            <div>
                <div className="FilmListItem"
                     onClick={this.filmClickFunc}>
                    {this.renderRedirect()}
                    {this.props.film.urlImg == null ? (
                        <img id="FilmImage" src={image}/>
                    ) : (
                        <img id="FilmImage" src={this.props.film.urlImg}/>
                    )}
                    <div className="FilmListItemContent">
                        <label id="TitleValue">{this.props.film.title}</label>
                        <label>Жанр</label>
                        <label>{this.state.genre}</label>
                        <label>Оценок</label>
                        <label>{this.props.film.likes.length}</label>
                    </div>
                </div>
            </div>
        )
    }
}
