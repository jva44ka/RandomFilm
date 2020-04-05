import ApiService from './../services/FilmApiService';

export const FILMSPAGE_GET_FILMS_REQUEST = 'FILMSPAGE_GET_FILMS_REQUEST';
export const FILMSPAGE_GET_FILMS_SUCCSESS = 'FILMSPAGE_GET_FILMS_SUCCSESS';
export const FILMSPAGE_GET_FILMS_FAIL = 'FILMSPAGE_GET_FILMS_FAIL';
export const FILMSPAGE_CHANGE_INPUT = 'FILMSPAGE_CHANGE_INPUT';

const apiService = new ApiService();

export const getFilms = () => async(dispatch) => {
    dispatch({
        type: FILMSPAGE_GET_FILMS_REQUEST
    });

    let response = await apiService.GetAllFilms();

    if (response.status === 200) {
        dispatch({
            type: FILMSPAGE_GET_FILMS_SUCCSESS,
            payload: await response.json()
        });
    }
    else {
        dispatch({
            type: FILMSPAGE_GET_FILMS_FAIL,
            payload: response
        });
    }
};