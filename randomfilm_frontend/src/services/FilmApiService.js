import config from '../pathConfig.json';
import ApiService from './ApiService';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    apiService = new ApiService();
    authApi = new AuthService();

    Controller = config.filmsController;

    GetAllFilms = async () => {
        return await this.apiService.GetNonAuthRequest(this.Controller, '');
    };

    GetFilmById = async (id) => {
        return await this.apiService.GetNonAuthRequest(this.Controller, id);
    };

    GetRandomFilm = async () => {
        return await this.apiService.GetNonAuthRequest(this.Controller, 'Random');
    };

    GetSpecifityFilm = async () => {
        return await this.apiService.GetAuthRequest(this.Controller, 'Specificity', this.authApi.getCurrentUser().token);
    };
}