import React from 'react'

export default class FilmApiService {

    BasePath = 'http://localhost:64303';
    Controller = 'Films'
    Id = 'Random';

    GetRandomFilm = () => {
        //Работющий запрос
        fetch("http://localhost:64303/api/Films/Random", {
            method: 'GET',
            mode: 'cors'})

            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
    }

    getResource = async(controller = this.Controller, id = '') => {
        let res = await fetch(`${this.BasePath}/api/${controller}/${id}`, {
            method: 'GET',
            mode: 'cors'})

            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )

        //if (!res.ok) {
        //    throw Error(`Could not fetch ${this.BasePath}` +
        //        `, received ${res.status}`)
        //}
        return await res;
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

        return film;//this._transformFilm(film);
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