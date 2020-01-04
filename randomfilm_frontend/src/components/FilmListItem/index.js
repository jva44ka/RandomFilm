import React from 'react';

import {Redirect} from "react-router-dom";

import './styles.css';
import image from './image-not-found.png'
import FilmApiSrvice from '../../services/FilmApiService'

export  default  class  FilmListItem extends React.Component {

    genresArrayToString = (genres) => {
        let result = "";
        genres.forEach(item => {
                result += item.name + ", ";
            }
        );
        return result.substring(0, result.length - 2);
    }

    state = {
        genre: this.genresArrayToString(this.props.film.genres),
        isFilmSelected: false
    }

    apiService = new FilmApiSrvice();

    setRedirect = () => {
        this.setState({
            isFilmSelected: true
        })
    }

    renderRedirect = () => {
        if (this.state.isFilmSelected) {
            return <Redirect to='/Film'/>
        }
    }

    filmClickFunc = async (event) => {
        //this.apiService.selectedFilm = this.props.film;
        this.apiService.setSelectedFilm(this.props.film);
        console.log("Film Id is: " + this.apiService.selectedFilm.id);
        this.setRedirect();
    }

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
