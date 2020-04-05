import LikesApiService from './../services/LikesApiService';
import FilmsApiService from './../services/FilmApiService';

export const FILMPAGE_GET_FILM_REQUEST = 'FILMPAGE_GET_FILM_REQUEST';
export const FILMPAGE_GET_FILM_SUCCSESS = 'FILMPAGE_GET_FILM_SUCCSESS';
export const FILMPAGE_GET_FILM_FAIL = 'FILMPAGE_GET_FILM_FAIL';

export const FILMPAGE_GET_LIKE_REQUEST = 'FILMPAGE_GET_LIKE_REQUEST';
export const FILMPAGE_GET_LIKE_SUCCSESS = 'FILMPAGE_GET_LIKE_SUCCSESS';
export const FILMPAGE_GET_LIKE_FAIL = 'FILMPAGE_GET_LIKE_FAIL';

export const FILMPAGE_LIKE_CLICK = 'FILMPAGE_LIKE_CLICK';
export const FILMPAGE_DISLIKE_CLICK = 'FILMPAGE_DISLIKE_CLICK';

/*export const FILMPAGE_POST_LIKE_REQUEST = 'FILMPAGE_POST_LIKE_REQUEST';
export const FILMPAGE_POST_LIKE_SUCCSESS = 'FILMPAGE_POST_LIKE_SUCCSESS';
export const FILMPAGE_POST_LIKE_FAIL = 'FILMPAGE_POST_LIKE_FAIL';

export const FILMPAGE_POST_DISLIKE_REQUEST = 'FILMPAGE_POST_DISLIKE_REQUEST';
export const FILMPAGE_POST_DISLIKE_SUCCSESS = 'FILMPAGE_POST_DISLIKE_SUCCSESS';
export const FILMPAGE_POST_DISLIKE_FAIL = 'FILMPAGE_POST_DISLIKE_FAIL';

export const FILMPAGE_DELETE_LIKE_REQUEST = 'FILMPAGE_DELETE_LIKE_REQUEST';
export const FILMPAGE_DELETE_LIKE_SUCCSESS = 'FILMPAGE_DELETE_LIKE_SUCCSESS';
export const FILMPAGE_DELETE_LIKE_FAIL = 'FILMPAGE_DELETE_LIKE_FAIL';

export const FILMPAGE_DELETE_DISLIKE_REQUEST = 'FILMPAGE_DELETE_DISLIKE_REQUEST';
export const FILMPAGE_DELETE_DISLIKE_SUCCSESS = 'FILMPAGE_DELETE_DISLIKE_SUCCSESS';
export const FILMPAGE_DELETE_DISLIKE_FAIL = 'FILMPAGE_DELETE_DISLIKE_FAIL';*/

const likesApiService = new LikesApiService();
const filmsApiService = new FilmsApiService();

export const getFilm = (id) => async(dispatch) => {
    dispatch({
        type: FILMPAGE_GET_FILM_REQUEST
    });

    let response = await filmsApiService.GetFilmById();

    if (response.status === 200) {
        dispatch({
            type: FILMPAGE_GET_FILM_SUCCSESS,
            payload: await response.json()
        });
    }
    else {
        dispatch({
            type: FILMPAGE_GET_FILM_FAIL,
            payload: response
        });
    }
};

export const getLike = (filmId) => async(dispatch) => {
    dispatch({
        type: FILMPAGE_GET_LIKE_REQUEST
    });

    let response = await likesApiService.GetSelfLikeByFilmId(filmId);

    if (response.status === 200) {
        dispatch({
            type: FILMPAGE_GET_LIKE_SUCCSESS,
            payload: await response.json()
        });
    }
    else {
        dispatch({
            type: FILMPAGE_GET_LIKE_FAIL,
            payload: response
        });
    }
};

