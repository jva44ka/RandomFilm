import React from 'react';
import {connect} from "react-redux";

import {getRandomFilms, getSpecifityFilms, resetState,
    FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE, FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE} from "../../actions/filmsPreviewsComponentActions";

import FilmsCarousel from '../../components/FilmsCarousel';

import './styles.css';

class FilmsPreviewsComponent extends React.Component {

    componentWillUnmount = () => {
        this.props.resetState();
    };

    render = () => {
        let {props} = this;

        return (
            <div className="films-preview">
                <label className="general-instruction-label">
                    Здесь вы можете подобрать фильм для себя несколькими способами.
                </label>
                <label className="secondary-instruction-label">
                    Способ №1: Вам выдается совершенно случайный фильм из базы данных.
                </label>
                <label className="secondary-instruction-label">
                    Способ №2: Вам выдается фильм в соответствие с вашими предпочтениями. Необходимо
                    зарегестрироваться/войти
                    для данного способа.
                </label>
                <FilmsCarousel getFilmsFunc={props.getRandomFilms} films={props.randomFilms}
                               loading={props.randomFilmLoading} showed={props.randomFilmShowed}/>
                <FilmsCarousel getFilmsFunc={props.getSpecifityFilms} films={props.specificityFilms}
                               loading={props.specificityFilmLoading} showed={props.specificityFilmShowed}/>
            </div>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        getRandomFilms: () => dispatch(getRandomFilms()),
        getSpecifityFilms: () => dispatch(getSpecifityFilms()),
        resetState:() => dispatch(resetState),
    }
};

const mapStateToProps = (state) => {
    return {
        specificityFilms: state.filmsPreviewsComponentReducer.specificityFilms,
        randomFilms: state.filmsPreviewsComponentReducer.randomFilms,
        specificityFilmLoading: state.filmsPreviewsComponentReducer.specificityFilmLoading,
        randomFilmLoading: state.filmsPreviewsComponentReducer.randomFilmLoading,
        specificityFilmMini: state.filmsPreviewsComponentReducer.specificityFilmMini,
        randomFilmMini: state.filmsPreviewsComponentReducer.randomFilmMini,
        specificityFilmShowed: state.filmsPreviewsComponentReducer.specificityFilmShowed,
        randomFilmShowed: state.filmsPreviewsComponentReducer.randomFilmShowed
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsPreviewsComponent);