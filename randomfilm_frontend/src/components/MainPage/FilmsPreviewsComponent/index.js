import React from 'react';
import {connect} from "react-redux";

import {getRandomFilm, getSpecifityFilm,
    FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE, FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE} from "../../../actions/filmsPreviewsComponentActions";

import FilmComponent from './FilmComponent';

import './styles.css';

const FilmsPreviewsComponent = (props) => {
    return (
        <div className="films-preview">
            <label className="general-instruction-label">
                Здесь вы можете подобрать фильм для себя несколькими способами.
            </label>
            <label className="secondary-instruction-label">
                Способ №1: Вам выдается совершенно случайный фильм из базы данных.
            </label>
            <label className="secondary-instruction-label">
                Способ №2: Вам выдается фильм в соответствие с вашими предпочтениями. Необходимо зарегестрироваться/войти
                для данного способа.
            </label>
            <FilmComponent filmSelectFunc={props.getRandomFilm} changeSizeFunc={props.changeSizeRandomFilm}
                           film={props.randomFilm} loading={props.randomFilmLoading}
                           mini={props.randomFilmMini} showed={props.randomFilmShowed}/>
            <FilmComponent filmSelectFunc={props.getSpecificityFilm} changeSizeFunc={props.changeSizespecificityFilm}
                           film={props.specificityFilm} loading={props.specificityFilmLoading}
                           mini={props.specificityFilmMini} showed={props.specificityFilmShowed}/>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return{
        getRandomFilm: () => dispatch(getRandomFilm()),
        getSpecificityFilm: () => dispatch(getSpecifityFilm()),
        changeSizeRandomFilm:() => dispatch({type: FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE}),
        changeSizespecificityFilm:() => dispatch({type: FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE}),
    }
};

const mapStateToProps = (state) => {
    return {
        specificityFilm: state.filmsPreviewsComponentReducer.specificityFilm,
        randomFilm: state.filmsPreviewsComponentReducer.randomFilm,
        specificityFilmLoading: state.filmsPreviewsComponentReducer.specificityFilmLoading,
        randomFilmLoading: state.filmsPreviewsComponentReducer.randomFilmLoading,
        specificityFilmMini: state.filmsPreviewsComponentReducer.specificityFilmMini,
        randomFilmMini: state.filmsPreviewsComponentReducer.randomFilmMini,
        specificityFilmShowed: state.filmsPreviewsComponentReducer.specificityFilmShowed,
        randomFilmShowed: state.filmsPreviewsComponentReducer.randomFilmShowed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsPreviewsComponent);