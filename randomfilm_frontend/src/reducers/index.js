import { combineReducers } from 'redux';
import loginPageReducer from './loginPageReducer';
import appHeaderReducer from './appHeaderReducer';
import filmsPreviewsComponentReducer from './filmsPreviewsComponentReducer';
import filmsPageReducer from './filmsPageReducer';
import filmPageReducer from './filmPageReducer';

export default combineReducers({
    loginPageReducer,
    appHeaderReducer,
    filmsPreviewsComponentReducer,
    filmsPageReducer,
    filmPageReducer
})