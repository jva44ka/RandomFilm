import {FILMPAGE_LIKE_CLICK, FILMPAGE_DISLIKE_CLICK} from "../actions/filmPageActions";

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
        case FILMPAGE_LIKE_CLICK:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default filmPageReducer;