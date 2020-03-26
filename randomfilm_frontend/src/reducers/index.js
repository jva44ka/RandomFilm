import { combineReducers } from 'redux';
import loginPageReducer from './loginPageReducer';
import appHeaderReducer from './appHeaderReducer';
import filmComponentReducer from './filmComponentReducer';

export default combineReducers({
    //anotherReducer,
    loginPageReducer,
    appHeaderReducer,
    filmComponentReducer
})