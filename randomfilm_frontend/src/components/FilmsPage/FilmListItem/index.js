import React from 'react';
import {Link} from "react-router-dom";

import './styles.css';
import image from './image-not-found.png'
import genresToString from '../../../services/genresStringify';

const FilmListItem = ({film}) => {
    return (
        <Link className="FilmListItem"
              to={`/Film/${film.id}`}>
            {film.urlImg == null ? (
                <img id="FilmImage" src={image}/>
            ) : (
                <img id="FilmImage" src={film.urlImg}/>
            )}
            <div className="FilmListItemContent">
                <label id="TitleValue">{film.title}</label>
                <label>Жанр</label>
                <label>{genresToString(film)}</label>
                <label>Оценок</label>
                <label>{film.likes.length}</label>
            </div>
        </Link>
    )
};

export default FilmListItem;
