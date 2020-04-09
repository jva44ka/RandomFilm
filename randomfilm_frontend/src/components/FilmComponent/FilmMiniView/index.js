import React from 'react';

import image from './image-not-found.png';
import './styles.css';

    const FilmMiniView = ({film, FilmViewClick}) =>{

        return (
            <div>
                {film == null ? (
                    <div className="FilmMiniView">
                        <img id="FilmImage" src={image}/>
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