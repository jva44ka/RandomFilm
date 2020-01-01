import React from 'react';
import FilmComponent from '../FilmListItem';
import apiService from '../../services/FilmApiService'

import './styles.css'

export  default class FilmsPage extends  React.Component{

    api = new apiService();

    films = [];



    state = {
        searchText: "",
        films: []
    };

    componentDidMount = async () => {
        this.films = await this.api.GetAllFilms();
        console.log(this.films);
        this.setState({films: this.films});
    }

    handleInputChange = (event) => {
        this.setState({
            searchText: event.target.value,
            films: this.films.filter((item) => (item.title.toLowerCase().includes(event.target.value.toLowerCase())))
        })
    }

    render = () => {
        return (
            <div className="films-page">
                <label>
                    Список фильмов
                </label>
                <input  type="text"
                        name="searchText"
                        value={this.searchText}
                        onChange={this.handleInputChange}
                        placeholder="Поиск"
                        />
                {
                    (this.state.films || []).map((item) => (
                        <div key={item.id}>
                            <FilmComponent film={item} />
                        </div>
                    ))
                }
            </div>
        )
    }
}