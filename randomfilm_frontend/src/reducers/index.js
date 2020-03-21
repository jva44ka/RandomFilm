import { combineReducers } from 'redux';
import loginPageReducer from './loginPageReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    //anotherReducer,
    loginPageReducer,
    loginReducer
})