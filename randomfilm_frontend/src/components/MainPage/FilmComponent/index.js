import React from 'react';
import {connect} from "react-redux";

import FilmMiniView from './FilmMiniView';
import FilmFullView from './FilmFullView';
import {getFilm, FILMCOMPONENT_CHANGE_SIZE} from "../../../actions/filmComponentActions";

import './styles.css';
import loadingImg from '../../../generalResources/loadingGif.svg';

const FilmComponent = ({id, title, duration, genre, description, year, director, urlImg, urlTrailer,
                           filmsGenres, showed, mini, loading, onChangeViewSize, onClickGetFilmButton, FilmSelectFunc}) => {

    const film = {id, title, duration, genre, description, year, director, urlImg,
                    urlTrailer, filmsGenres, showed, mini, loading};
    return (
        <div>
            {!loading ? (
                <div>
                    {showed?
                        (
                            <div className="FilmComponent">
                                {mini?(
                                    <FilmMiniView
                                        film={film}
                                        FilmViewClick={onChangeViewSize}/>
                                ):(
                                    <FilmFullView
                                        film={film}
                                        FilmViewClick={onChangeViewSize}/>
                                )}
                                <div className="FilmComponent-Flex">
                                    <button id="GetFilmButton" onClick={() => {onClickGetFilmButton(FilmSelectFunc)}}>Еще фильм</button>
                                </div>
                            </div>
                        ):(
                            <div className="FilmComponent-Flex">
                                <button id="GetFilmButton" onClick={() => {onClickGetFilmButton(FilmSelectFunc)}}>Получить фильм</button>
                            </div>
                        )
                    }
                </div>
            ) : (
                <div className="FilmComponent">
                    <img src={loadingImg} id="loadingImg" width="200" height="200"/>
                </div>
            )}
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return{
        onChangeViewSize: () => dispatch({type: FILMCOMPONENT_CHANGE_SIZE}),
        onClickGetFilmButton: (FilmSelectFunc) => dispatch(getFilm(FilmSelectFunc))
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.filmComponentReducer.id,
        title: state.filmComponentReducer.title,
        duration: state.filmComponentReducer.duration,
        genre:  state.filmComponentReducer.genre,
        description: state.filmComponentReducer.description,
        year:   state.filmComponentReducer.year,
        director:   state.filmComponentReducer.director,
        urlImg:     state.filmComponentReducer.urlImg,
        urlTrailer: state.filmComponentReducer.urlTrailer,
        filmsGenres: state.filmComponentReducer.filmsGenres,
        showed: state.filmComponentReducer.showed,
        mini: state.filmComponentReducer.mini,
        loading: state.filmComponentReducer.loading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmComponent);