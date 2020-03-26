import {FILMCOMPONENT_GET_FILM_REQUEST, FILMCOMPONENT_GET_FILM_SUCCSESS,
    FILMCOMPONENT_GET_FILM_FAIL, FILMCOMPONENT_CHANGE_SIZE} from "../actions/filmComponentActions";

const initialState = {
    id:     undefined,
    title:  undefined,
    duration:   undefined,
    genre:  undefined,
    description: undefined,
    year:   undefined,
    director:   undefined,
    urlImg:     undefined,
    urlTrailer: undefined,
    filmsGenres: [],
    showed: false,
    mini: true,
    loading: false
};

const filmComponentReducer = (state = initialState, action) => {
    switch(action.type){
        case FILMCOMPONENT_GET_FILM_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FILMCOMPONENT_GET_FILM_SUCCSESS:
            return {
                id: action.payload.id,
                title: action.payload.title,
                duration: action.payload.duration,
                genre: action.payload.genre,
                description: action.payload.description,
                year: action.payload.year,
                director: action.payload.director,
                urlImg: action.payload.urlImg,
                urlTrailer: action.payload.urlTrailer,
                filmsGenres: action.payload.filmsGenres,
                showed: true,
                mini: true,
                loading: false
            };

        case FILMCOMPONENT_GET_FILM_FAIL:
            return {
                showed: true,
                mini: true,
                loading: false
            };

        case FILMCOMPONENT_CHANGE_SIZE:
            return {
                ...state,
                mini: !state.mini
            };

        default:
            return state;
    }
};

export default filmComponentReducer;