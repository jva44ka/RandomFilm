import ApiService from '../services/AuthenticationService';
import {HEADER_LOGOUT_BUTTON_ONCLICK} from '../actions/appHeaderActions';
import {GET_TOKEN_SUCCESS} from "../actions/loginPageActions";

const initialState = {
    isAuth: false
};

const apiService = new ApiService();

const appHeaderReducer = (state = initialState, action) => {
    switch(action.type){
        case HEADER_LOGOUT_BUTTON_ONCLICK:
            apiService.logout();
            return {isAuth: false};

        case GET_TOKEN_SUCCESS:
            return {isAuth: true};

        default:
            return state;
    }
};

export default appHeaderReducer;