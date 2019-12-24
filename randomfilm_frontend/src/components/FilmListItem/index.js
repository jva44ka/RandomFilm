import React from 'react';

import './styles.css';
import image from './image-not-found.png'
import filmApiSrvice from '../../services/FilmApiService'

const filmClickFunc = async (event) => {
    const filmApiSrvice = new filmApiSrvice();
    filmApiSrvice.selectedFilmId = await Number(event.target.itemID);
    console.log("Film Id is: " + filmApiSrvice.selectedFilmId);
}

const FilmListItem = ({film/*, filmClickFunc*/}) => {
    return (
        <div>
            <div className="FilmListItem"
                 itemID={film.id}
                 onClick={filmClickFunc}>
                {film.urlImg == null ? (
                    <img id="FilmImage" src={image}/>
                ):(
                    <img id="FilmImage" src={film.urlImg}/>
                )}
                <label id="TitleValue">{film.title}</label>
            </div>
        </div>

    )
}

export default FilmListItem;