import { GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL } from '../actions/loginPageActions';

const initialState = {
    login: "",
    password: "",
    validationMessage: "",
    flagForRender: false
};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LoginPage_HandleInputChange':
            return handleInputChange(state, action.payload);

        case GET_TOKEN_SUCCESS:
            return updateStateWithLogin(state);

        case GET_TOKEN_FAIL:
            return updateStateWithFail(state, action.payload);

        default:
            return state;
    }
};

const handleInputChange = (state, payload) => {
    return{
        ...state,
        [payload.target.name]: payload.target.value
    }
};

const updateStateWithLogin = (state) => {
    //Меняем loggedIn, который нужен просто для перерендера
    return{
        ...state,
        flagForRender: !state.flagForRender
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