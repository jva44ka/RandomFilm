import ApiService from '../services/AuthenticationService';

const initialState = {
    login1: "",
    password1: "",
    token1: ""
}

const apiService = new ApiService();

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN123':
            return state;

        default:
            return state;
    }
};

export default loginReducer;