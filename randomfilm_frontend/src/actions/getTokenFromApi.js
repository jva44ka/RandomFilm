import AuthService from '../services/AuthenticationService'

const authService = new AuthService();

export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAIL = 'GET_TOKEN_FAIL';

/*export const getTokenRequest = () => {
    return{
        type: GET_TOKEN_REQUEST
    }
};

export const getTokenSucsess = (data) => {
    return{
        type: GET_TOKEN_SUCCESS,
        payload: data
    }
};

export const getTokenFail = (response) => {
    return{
        type: GET_TOKEN_FAIL,
        payload: response
    }
};*/

export const getToken = (login, password) => async(dispatch) => {
        dispatch({
            type: GET_TOKEN_REQUEST
        });

        let response = await authService.login(login, password);

        if (response.status === 200) {
            dispatch({
                type: GET_TOKEN_SUCCESS,
                payload: response.text()
            });
        }
        else {
            dispatch({
                type: GET_TOKEN_FAIL,
                payload: response
            });
        }
};