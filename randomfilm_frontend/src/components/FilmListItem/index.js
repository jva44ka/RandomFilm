import React from 'react';
import {Link} from "react-router-dom";

import './styles.css';
import genresToString from '../../services/genresStringify';

const FilmListItem = ({film}) => {
    return (
        <Link className="FilmListItem"
              to={`/Film/${film.id}`}>
            <img id="FilmImage" src={film.urlImg}/>
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
