import config from '../pathConfig.json';
import ApiService from './ApiService';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    apiService = new ApiService();
    authApi = new AuthService();

    Controller = config.likesController;

    GetSelfLikeByFilmId = async (id) => {
        let result = await this.apiService.GetAuthRequest(this.Controller, `ByFilm/${id}`, this.authApi.getCurrentUser().token);
        console.log(result);
        return result;
    }

    PostSelfLike = async (filmId, likeOrDislike) => {
        let body = {
            filmId: filmId,
            likeOrDislike: likeOrDislike
        };
        console.log(body);
        return await this.apiService.PostAuthRequest(this.Controller, '', this.authApi.getCurrentUser().token, JSON.stringify(body));
    }

    DeleteSelfLike = async (filmId) => {
        return await this.apiService.DeleteAuthRequest(this.Controller, `ByFilm/${filmId}`, this.authApi.getCurrentUser().token);
    }
}