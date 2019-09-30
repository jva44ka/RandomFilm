

export default class FilmApiService {

    BasePath = 'http://localhost:64303';
    Controller = 'Films'
    Id = 'Random';

    async getResource(controller = this.Controller, id = '') {
        const res = await fetch(`${this.BasePath}/api/${controller}/${id}`, {mode: 'cors'});

        if (!res.ok) {
            throw new Error(`Could not fetch ${this.BasePath}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllFilms() {
        const res = await this.getResource('Films');
        return res.results.map(this._transformFilm);
    }

    async getFilmById(id) {
        const film = await this.getResource(this.Controller, id);
        return this._transformFilm(film);
    }

    async getRandomFilm() {
        const film = await this.getResource(this.Controller, 'Random');

        return this._transformFilm(film);
    }

    _transformFilm(film) {
        return {
                id: film.id,
                title: film.title,
                duaration: film.duaration,
                genre: film.genre,
                description: film.description,
                year: film.year,
                director: film.director,
                urlImg: film.urlImg,
                urlTrailer: film.urlTrailer
        }
    }
}