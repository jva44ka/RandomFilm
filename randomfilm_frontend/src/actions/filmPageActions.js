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

export const FILMPAGE_POST_LIKE_REQUEST = 'FILMPAGE_POST_LIKE_REQUEST';
export const FILMPAGE_POST_LIKE_SUCCSESS = 'FILMPAGE_POST_LIKE_SUCCSESS';
export const FILMPAGE_POST_LIKE_FAIL = 'FILMPAGE_POST_LIKE_FAIL';

export const FILMPAGE_POST_DISLIKE_REQUEST = 'FILMPAGE_POST_DISLIKE_REQUEST';
export const FILMPAGE_POST_DISLIKE_SUCCSESS = 'FILMPAGE_POST_DISLIKE_SUCCSESS';
export const FILMPAGE_POST_DISLIKE_FAIL = 'FILMPAGE_POST_DISLIKE_FAIL';

export const FILMPAGE_DELETE_LIKE_REQUEST = 'FILMPAGE_DELETE_LIKE_REQUEST';
export const FILMPAGE_DELETE_LIKE_SUCCSESS = 'FILMPAGE_DELETE_LIKE_SUCCSESS';
export const FILMPAGE_DELETE_LIKE_FAIL = 'FILMPAGE_DELETE_LIKE_FAIL';

const likesApiService = new LikesApiService();
const filmsApiService = new FilmsApiService();

export const getFilm = (filmId) => async(dispatch) => {
    await getFilmAsync(filmId, dispatch);
};

const getFilmAsync = async(filmId, dispatch) => {
    dispatch({
        type: FILMPAGE_GET_FILM_REQUEST
    });

    let response = await filmsApiService.GetFilmById(filmId);

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
    console.log('film request action is requested');
};

export const getLike = (filmId) => async(dispatch) => {
    await getLikeAsync(filmId, dispatch);
};

const getLikeAsync = async(filmId, dispatch) => {
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

//Метод вызывает запрос лайка только после получения фильма
export const getFilmAndLike = (filmId) => async(dispatch) => {
    await getFilmAsync(filmId, dispatch);
    await getLikeAsync(filmId, dispatch);
};

export const onLikeClick = (filmId, isLikeThere, likeOrDislike) => async(dispatch) => {
    if(isLikeThere){
        if(likeOrDislike){
            await unLike(filmId, dispatch);
        }
        else {
            await unLike(filmId, dispatch);
            await like(filmId, dispatch);
        }
    }
    else{
        await like(filmId, dispatch);
    }
};

export const onDislikeClick = (filmId, isLikeThere, likeOrDislike) => async(dispatch) => {
    if(isLikeThere){
        if(likeOrDislike){
            await unLike(filmId, dispatch);
            await dislike(filmId, dispatch);
        }
        else {
            await unLike(filmId, dispatch);
        }
    }
    else{
        await dislike(filmId, dispatch);
    }
};

const like = async(filmId, dispatch) => {
    dispatch({
        type: FILMPAGE_POST_LIKE_REQUEST
    });

    let response = await likesApiService.PostSelfLike(filmId, true);

    if (response.status === 200 || 201) {
        dispatch({
            type: FILMPAGE_POST_LIKE_SUCCSESS
        });
    }
    else{
        dispatch({
            type: FILMPAGE_POST_LIKE_FAIL,
            payload: response
        });
    }

};

const dislike = async(filmId, dispatch) => {
    dispatch({
        type: FILMPAGE_POST_DISLIKE_REQUEST
    });

    let response = await likesApiService.PostSelfLike(filmId, false);

    if (response.status === 200 || 201) {
        dispatch({
            type: FILMPAGE_POST_DISLIKE_SUCCSESS
        });
    }
    else{
        dispatch({
            type: FILMPAGE_POST_DISLIKE_FAIL,
            payload: response
        });
    }
};

const unLike = async(filmId, dispatch) => {
    dispatch({
        type: FILMPAGE_DELETE_LIKE_REQUEST
    });

    let response = await likesApiService.DeleteSelfLike(filmId);

    if (response.status === 200) {
        dispatch({
            type: FILMPAGE_DELETE_LIKE_SUCCSESS
        });
    }
    else{
        dispatch({
            type: FILMPAGE_DELETE_LIKE_FAIL,
            payload: response
        });
    }
};

