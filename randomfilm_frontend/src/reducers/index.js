import { combineReducers } from 'redux';
import loginPageReducer from './loginPageReducer';
import appHeaderReducer from './appHeaderReducer';

export default combineReducers({
    //anotherReducer,
    loginPageReducer,
    appHeaderReducer
})