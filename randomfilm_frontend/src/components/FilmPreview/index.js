import React from 'react';
import {Link} from 'react-router-dom';

import image from './image-not-found.png';
import './styles.css';

    const FilmPreview = ({film}) =>{

        return (
            <div>
                {film == null ? (
                    <div className="preview">
                        <img id="preview__image" src={image}/>
                    </div>
                ):(
                    <div className="preview">
                        <img className="preview__image" src={film.urlImg}/>
                        <label className="preview__title">{film.title}</label>
                        <Link className="preview__film-page-link" to={`/Film/${film.id}`}>К фильму</Link>
                    </div>
                )}
            </div>

        )
    };

    export default FilmPreview;