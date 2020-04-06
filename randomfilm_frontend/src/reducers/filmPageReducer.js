import {FILMPAGE_GET_FILM_REQUEST,
    FILMPAGE_GET_FILM_SUCCSESS,
    FILMPAGE_GET_FILM_FAIL,

    FILMPAGE_GET_LIKE_REQUEST,
    FILMPAGE_GET_LIKE_SUCCSESS,
    FILMPAGE_GET_LIKE_FAIL,

    FILMPAGE_LIKE_CLICK,
    FILMPAGE_DISLIKE_CLICK,

    FILMPAGE_POST_LIKE_REQUEST,
    FILMPAGE_POST_LIKE_SUCCSESS,
    FILMPAGE_POST_LIKE_FAIL,

    FILMPAGE_POST_DISLIKE_REQUEST,
    FILMPAGE_POST_DISLIKE_SUCCSESS,
    FILMPAGE_POST_DISLIKE_FAIL,

    FILMPAGE_DELETE_LIKE_REQUEST,
    FILMPAGE_DELETE_LIKE_SUCCSESS,
    FILMPAGE_DELETE_LIKE_FAIL} from "../actions/filmPageActions";
import getGenresString from '../services/genresStringify';

const initialState = {
    film: {},
    like: {},
    genreString: "",
    likeOrDislike: undefined,
    isLikeThere: false,
    comments: [],
};

const filmPageReducer = (state = initialState, action) => {
    switch(action.type){
        case FILMPAGE_GET_FILM_SUCCSESS:
            return {
                genreString: getGenresString(action.payload),
                film: {
                    ...action.payload
                }
            };

        case FILMPAGE_GET_LIKE_SUCCSESS:
            let isLikeThere = false;
            let likeOrDislike = undefined;
            if (action.payload.id){
                likeOrDislike = action.payload.likeOrDislike;
                isLikeThere = true;
            }
            return{
                ...state,
                like: action.payload,
                likeOrDislike: likeOrDislike,
                isLikeThere: isLikeThere
            };

        case FILMPAGE_POST_LIKE_SUCCSESS:
            return{
                ...state,
                likeOrDislike: true,
                isLikeThere: true

            };

        case FILMPAGE_POST_DISLIKE_SUCCSESS:
            return{
                ...state,
                likeOrDislike: false,
                isLikeThere: true
            };

        case FILMPAGE_DELETE_LIKE_SUCCSESS:
            return{
                ...state,
                like: {},
                likeOrDislike: undefined,
                isLikeThere: false
            };

        default:
            return state;
    }
};

export default filmPageReducer;