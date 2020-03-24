import ApiService from '../services/AuthenticationService';
import { GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL } from '../actions/getTokenFromApi.js';

const initialState = {
    login: "",
    password: "",
    validationMessage: ""
};

const apiService = new ApiService();

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LoginPage_HandleInputChange':
            return handleInputChange(state, action.payload);

        case 'LoginPage_OnFormSubmit':
            return onSubmit(state, action.payload);

        case GET_TOKEN_SUCCESS:
            return updateStateWithLogin(state);

        case GET_TOKEN_FAIL:
            return updateStateWithFail(state, action.payload);

        default:
            return state;
    }
}

const handleInputChange = (state, payload) => {
    return{
        ...state,
        [payload.target.name]: payload.target.value
    }
};

const onSubmit = (state, event) => {
    event.preventDefault();
    let response = apiService.login(state.login, state.password);
    console.log('respone is:');
    console.log(response);
    console.log('status respone is:');
    console.log(response.status);
    if (response.status === 200){
        let user = apiService.getCurrentUser();
        console.log("user: " + user);
        console.log("login: " + user.login);
        console.log("token: " + user.token);
        return {
            ...state,
            login: state.login,
            password: state.password
        };
    }
    else{
        switch(response.status) {
            case 404:
                return {
                    ...state,
                    validationMessage: "Неверный логин/пароль"
                };

            case 500:
                return {
                    ...state,
                    validationMessage: "Ошибка сервера"
                };

            default:
                console.log('not found token');
                return {
                    login: state.login,
                    password: state.password,
                    validationMessage: "Неопознаная ошибка"
                };
        }
    }
};

const updateStateWithLogin = (state) => {
    //Меняем стейт для перерендера
    return{
        ...state,
        validationMessage: "Успех!"
    }
};

const updateStateWithFail = (state, payload) => {
    switch(payload.status) {
        case 404:
            return {
                ...state,
                validationMessage: "Неверный логин/пароль"
            };

        case 500:
            return {
                ...state,
                validationMessage: "Ошибка сервера"
            };

        default:
            console.log('not found token');
            return {
                ...state,
                validationMessage: "Неопознаная ошибка"
            };
    }
};

export default loginReducer;