import config from '../pathConfig.json';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    authApi = new AuthService();

    BasePath = 'http://localhost:64303';
    Controller = 'Films';

    selectedFilmId;

    GetResource = async(controller = this.Controller, method = "") => {
        let result = {};
        await fetch(`${this.BasePath}/api/${controller}/${method}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Authorization": `Bearer ${this.authApi.getCurrentUser().token}`
                    }
                }
            )

            .then(res => res.json())
            .then((resultRequest) => {
                    result = resultRequest;
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
        return result;
    }

    GetAllFilms = async () => {
        const result = await this.GetResource('Films', '');
        console.log(result);
        return result;
    }

    GetFilmById = async (id) => {
        return await this.GetResource('Films', id);
    }

    GetRandomFilm = async () => {
        const result = await this.GetResource('Films', 'Random');
        console.log(result);
        return result;
    }

    GetSpecifityFilm = async () => {
        const result = await this.GetResource('Films', 'SpecificityFilm');
        console.log(result);
        return result;
    }
}