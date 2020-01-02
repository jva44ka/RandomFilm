import config from '../pathConfig.json';
import ApiService from './ApiService';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    apiService = new ApiService();
    authApi = new AuthService();

    Controller = 'Likes';

    GetSelfLikeByFilmId = async (id) => {
        return await this.apiService.GetAuthRequest(this.Controller, `ByFilm/${id}`, this.authApi.getCurrentUser().token);
    }

    PostSelfLike = async (filmId, likeOrDislike) => {
        return await this.apiService.PostAuthRequest(this.Controller, `${id}`, this.authApi.getCurrentUser().token);
    }

    DeleteSelfLike = async (id) => {
        //return await this.apiService.PostAuthRequest(this.Controller, `ByFilm/${id}`, this.authApi.getCurrentUser().token);
    }
}