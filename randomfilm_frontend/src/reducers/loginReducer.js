import ApiService from '../services/AuthenticationService';

const initialState = {
    login: "",
    password: "",
    token: ""
}

const apiService = new ApiService();

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return state;

        default:
            return state;
    }
};

export default loginReducer;