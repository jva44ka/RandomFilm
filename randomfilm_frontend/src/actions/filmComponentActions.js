export const FILMCOMPONENT_GET_FILM_REQUEST = 'FILMCOMPONENT_GET_FILM_REQUEST';
export const FILMCOMPONENT_GET_FILM_SUCCSESS = 'FILMCOMPONENT_GET_FILM_SUCCSESS';
export const FILMCOMPONENT_GET_FILM_FAIL = 'FILMCOMPONENT_GET_FILM_FAIL';
export const FILMCOMPONENT_CHANGE_SIZE = 'FILMCOMPONENT_CHANGE_SIZE';

export const getFilm = (getFilmFunction) => async(dispatch) => {
    dispatch({
        type: FILMCOMPONENT_GET_FILM_REQUEST
    });

    let response = await getFilmFunction();

    if (response.status === 200) {
        dispatch({
            type: FILMCOMPONENT_GET_FILM_SUCCSESS,
            payload: await response.json()
        });
    }
    else {
        dispatch({
            type: FILMCOMPONENT_GET_FILM_FAIL,
            payload: response
        });
    }
};