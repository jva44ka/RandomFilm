import React from 'react';

import image from './image-not-found.png';
import './FilmMiniView.css';

    const FilmMiniView = ({film, FilmViewClick}) =>{

        return (
            <div>
                {film.urlImg == null ? (
                    <div className="FilmMiniView" onClick={FilmViewClick}>
                        <img id="FilmImage" src={image}/>
                        <label id="TitleValue">{film.title}</label>
                    </div>
                ):(
                    <div className="FilmMiniView" onClick={FilmViewClick}>
                        <img id="FilmImage" src={film.urlImg}/>
                        <label id="TitleValue">{film.title}</label>
                    </div>
                )}
            </div>

        )
    };

    export default FilmMiniView;