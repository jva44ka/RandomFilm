import React from 'react';
import FilmMiniView from './FilmMiniView';
import FilmFullView from './FilmFullView';

import './styles.css';

import loadingImg from '../../generalResources/loadingGif.svg';

const FilmComponent = (props) => {
    return (
        <React.Fragment>
            {!props.loading ? (
                <div>
                    {props.showed?
                        (
                            <div className="FilmComponent">
                                {props.mini?(
                                    <FilmMiniView
                                        film={props.film}
                                        FilmViewClick={props.changeSizeFunc}/>
                                ):(
                                    <FilmFullView
                                        film={props.film}
                                        FilmViewClick={props.changeSizeFunc}/>
                                )}
                                <div className="FilmComponent-Flex">
                                    <button id="GetFilmButton" onClick={props.filmSelectFunc}>Еще фильм</button>
                                </div>
                            </div>
                        ):(
                            <div className="FilmComponent-Flex">
                                <button id="GetFilmButton" onClick={props.filmSelectFunc}>Получить фильм</button>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className="FilmComponent">
                    <img src={loadingImg} id="loadingImg" width="200" height="200"/>
                </div>
            )}
        </React.Fragment>
    )
}

export default FilmComponent;