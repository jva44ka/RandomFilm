import config from '../pathConfig.json';
import AuthService from './AuthenticationService';

export default class FilmApiService {

    authApi = new AuthService();

    BasePath = 'http://localhost:64303';
    Controller = 'Films';
    Id = 'Random';

    GetResource = async(controller = this.Controller, id = '') => {
        let result = {};
        await fetch(`${this.BasePath}/api/${controller}/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Authorization": `Bearer ${this.authApi.getCurrentUser().token}`
            } },)

            .then(res => res.json())
            .then((resultRequest) => {
                    result = {
                        id: resultRequest.id,
                        title: resultRequest.title,
                        duaration: resultRequest.duaration,
                        genre: resultRequest.genre,
                        description: resultRequest.description,
                        year: resultRequest.year,
                        director: resultRequest.director,
                        urlImg: resultRequest.urlImg,
                        urlTrailer: resultRequest.urlTrailer
                    };
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
        //if (!res.ok) {
        //    throw Error(`Could not fetch ${this.BasePath}` +
        //        `, received ${res.status}`)
        //}
        return result;
    };

    GetAllFilms = async () => {
        return await this.GetResource('Films');
    };

    GetFilmById = async (id) => {
        return await this.GetResource('Films', id);
    };

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