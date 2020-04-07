import {FILMSPREVIEWS_GET_SPECIFICITY_FILM_REQUEST, FILMSPREVIEWS_GET_SPECIFICITY_FILM_SUCCSESS,
    FILMSPREVIEWS_GET_SPECIFICITY_FILM_FAIL, FILMSPREVIEWS_GET_RANDOM_FILM_REQUEST,
    FILMSPREVIEWS_GET_RANDOM_FILM_SUCCSESS, FILMSPREVIEWS_GET_RANDOM_FILM_FAIL,
    FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE, FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE} from "../actions/filmsPreviewsComponentActions";

const initialState = {
    specificityFilms: {},
    randomFilms: {},
    specificityFilmLoading: false,
    randomFilmLoading: false,
    specificityFilmMini: true,
    randomFilmMini: true,
    specificityFilmShowed: false,
    randomFilmShowed: false
};

const filmsPreviewsComponentReducer = (state = initialState, action) => {
    switch(action.type){
        case FILMSPREVIEWS_GET_SPECIFICITY_FILM_REQUEST:
            return {
                ...state,
                specificityFilmShowed:true,
                specificityFilmMini: true,
                specificityFilmLoading: true
            };

        case FILMSPREVIEWS_GET_RANDOM_FILM_REQUEST:
            return {
                ...state,
                randomFilmShowed:true,
                randomFilmMini: true,
                randomFilmLoading: true
            };

        case FILMSPREVIEWS_GET_SPECIFICITY_FILM_SUCCSESS:
            return {
                ...state,
                specificityFilms: action.payload,
                specificityFilmLoading: false
            };

        case FILMSPREVIEWS_GET_RANDOM_FILM_SUCCSESS:
            return {
                ...state,
                randomFilms: action.payload,
                randomFilmLoading: false
            };

        case FILMSPREVIEWS_GET_SPECIFICITY_FILM_FAIL:
            return {
                ...state,
                specificityFilms: {},
                specificityFilmLoading: false
            };

        case FILMSPREVIEWS_GET_RANDOM_FILM_FAIL:
            return {
                ...state,
                randomFilms: {},
                randomFilmLoading: false
            };

        case FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE:
            return {
                ...state,
                specificityFilmMini: !state.specificityFilmMini
            };

        case FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE:
            return {
                ...state,
                randomFilmMini: !state.randomFilmMini
            };

        default:
            return state;
    }
};

export default filmsPreviewsComponentReducer;