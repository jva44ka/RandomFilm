import config from '../pathConfig';
import ApiService from './ApiService';

export  default class AuthenticationService {
    authController = config.authController;
    getTokenMethod = config.getTokenMethod;

    apiService = new ApiService();

    getCurrentUser = () => {
        return {
            login: localStorage.getItem('currentLogin'),
            token: localStorage.getItem('currentToken')
        }
    };

    setCurrentUser = (login, token) => {
        localStorage.setItem('currentLogin', login);
        localStorage.setItem('currentToken', token);
    };

    login = async(login, password) => {
        let response = await this.tokenRequest(login, password);
        if (response.status === 200){
            let data = await response.text();
            this.setCurrentUser(login, data);
        }
        return response;
    };

    logout = () => {
        this.setCurrentUser("", "");
    };

    tokenRequest = async(login, password) => {
        let body = JSON.stringify({
            "login": `${login}`,
            "password": `${password}`
        });
        return await this.apiService.PostNonAuthRequest(this.authController, this.getTokenMethod, body);
    }
}