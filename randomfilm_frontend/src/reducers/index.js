import { combineReducers } from 'redux';
import loginPageReducer from './loginPageReducer';
import appHeaderReducer from './appHeaderReducer';
import filmsPreviewsComponentReducer from './filmsPreviewsComponentReducer';
import filmsListPageReducer from './filmsListPageReducer';

export default combineReducers({
    //anotherReducer,
    loginPageReducer,
    appHeaderReducer,
    filmsPreviewsComponentReducer,
    filmsListPageReducer
})