import config from '../pathConfig.json';
import ApiService from './ApiService';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    apiService = new ApiService();
    authApi = new AuthService();

    Controller = 'Films';

    selectedFilm = {};

    getSelectFilm = () => {
        return {
        id:     sessionStorage.getItem('selectedFilmId'),
        title:  sessionStorage.getItem('selectedFilmTitle'),
        urlTrailer: sessionStorage.getItem('selectedFilmUrlTrailer'),
        urlImg:     sessionStorage.getItem('selectedFilmUrlImg'),
        genre:      sessionStorage.getItem('selectedFilmGenre'),
        description: sessionStorage.getItem('selectedFilmDescription'),
        duration:   sessionStorage.getItem('selectedFilmDuration'),
        year:       sessionStorage.getItem('selectedFilmYear'),
        director: sessionStorage.getItem('selectedFilmDirector'),
        }
    };

    setSelectedFilm = (film) => {
        sessionStorage.setItem('selectedFilmId', film.id);
        sessionStorage.setItem('selectedFilmTitle', film.title);
        sessionStorage.setItem('selectedFilmUrlTrailer', film.urlTrailer);
        sessionStorage.setItem('selectedFilmUrlImg', film.urlImg);
        sessionStorage.setItem('selectedFilmGenre', film.genre);
        sessionStorage.setItem('selectedFilmDescription', film.description);
        sessionStorage.setItem('selectedFilmDuration', film.duration);
        sessionStorage.setItem('selectedFilmYear', film.year);
        sessionStorage.setItem('selectedFilmDirector', film.director);
    };

    GetAllFilms = async () => {
        return await this.apiService.GetNonAuthRequest(this.Controller, '');
    }

    GetFilmById = async (id) => {
        return await this.apiService.GetNonAuthRequest(this.Controller, id);
    }

    GetRandomFilm = async () => {
        return await this.apiService.GetNonAuthRequest(this.Controller, 'Random');
    }

    GetSpecifityFilm = async () => {
        return await this.apiService.GetAuthRequest(this.Controller, 'SpecificityFilm', this.authApi.getCurrentUser().token);
    }
}