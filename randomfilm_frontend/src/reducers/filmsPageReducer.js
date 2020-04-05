import {FILMSPAGE_GET_FILMS_REQUEST, FILMSPAGE_GET_FILMS_SUCCSESS,
    FILMSPAGE_GET_FILMS_FAIL, FILMSPAGE_CHANGE_INPUT} from "../actions/filmsPageActions";

const initialState = {
    isFilmSelected: false,
    films: [],
    filmsShowed: [],
    loading: false,
    searchText: "",
};

const filmsListPageReducer = (state = initialState, action) => {
    switch(action.type){
        case FILMSPAGE_GET_FILMS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FILMSPAGE_GET_FILMS_SUCCSESS:
            return {
                ...state,
                isFilmSelected: false,
                films: action.payload,
                filmsShowed: action.payload,
                loading: false,
                searchText: "",
            };

        case FILMSPAGE_GET_FILMS_FAIL:
            return {
                ...state,
                films: [],
                filmsShowed: [],
                loading: false,
            };

        case FILMSPAGE_CHANGE_INPUT:
            return {
                ...state,
                searchText: action.payload.target.value,
                filmsShowed: state.films.filter((item) => (item.title.toLowerCase().includes(action.payload.target.value.toLowerCase())))
            };

        default:
            return state;
    }
};

export default filmsListPageReducer;