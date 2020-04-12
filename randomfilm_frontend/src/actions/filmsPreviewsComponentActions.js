import ApiService from '../services/FilmApiService';

export const FILMSPREVIEWS_GET_SPECIFICITY_FILM_REQUEST = 'FILMSPREVIEWS_GET_SPECIFICITY_FILM_REQUEST';
export const FILMSPREVIEWS_GET_SPECIFICITY_FILM_SUCCSESS = 'FILMSPREVIEWS_GET_SPECIFICITY_FILM_SUCCSESS';
export const FILMSPREVIEWS_GET_SPECIFICITY_FILM_FAIL = 'FILMSPREVIEWS_GET_SPECIFICITY_FILM_FAIL';

export const FILMSPREVIEWS_GET_RANDOM_FILM_REQUEST = 'FILMSPREVIEWS_GET_RANDOM_FILM_REQUEST';
export const FILMSPREVIEWS_GET_RANDOM_FILM_SUCCSESS = 'FILMSPREVIEWS_GET_RANDOM_FILM_SUCCSESS';
export const FILMSPREVIEWS_GET_RANDOM_FILM_FAIL = 'FILMSPREVIEWS_GET_RANDOM_FILM_FAIL';

export const FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE = 'FILMSPREVIEWS_SPECIFICITY_FILM_CHANGE_SIZE';
export const FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE = 'FILMSPREVIEWS_RANDOM_FILM_CHANGE_SIZE';

export const FILMSPREVIEWS_RESET_STATE = 'FILMSPREVIEWS_RESET_STATE';

const apiService = new ApiService();

export const resetState = {
    type: FILMSPREVIEWS_RESET_STATE
};

export const getSpecifityFilms = () => async(dispatch) => {
    getFilm(apiService.GetSpecifityFilms, dispatch, FILMSPREVIEWS_GET_SPECIFICITY_FILM_REQUEST,
        FILMSPREVIEWS_GET_SPECIFICITY_FILM_SUCCSESS, FILMSPREVIEWS_GET_SPECIFICITY_FILM_FAIL);
};

export const getRandomFilms = () => async(dispatch) => {
    getFilm(apiService.GetRandomFilms, dispatch, FILMSPREVIEWS_GET_RANDOM_FILM_REQUEST,
        FILMSPREVIEWS_GET_RANDOM_FILM_SUCCSESS, FILMSPREVIEWS_GET_RANDOM_FILM_FAIL);
};

const getFilm = async(getFilmFunction, dispatch, requestActionName, successActionName, failActionName) => {
    dispatch({
        type: requestActionName
    });

    let response = await getFilmFunction();

    if (response.status === 200) {
        dispatch({
            type: successActionName,
            payload: await response.json()
        });
    }
    else {
        dispatch({
            type: failActionName,
            payload: response
        });
    }
};