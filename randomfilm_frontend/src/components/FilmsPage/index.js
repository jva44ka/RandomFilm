import React from 'react';
import FilmComponent from '../FilmListItem';
import apiService from '../../services/FilmApiService'

import './styles.css'

export  default class FilmsPage extends  React.Component{

    api = new apiService();

    films = [
        {
            id: 0,
            title: "Интерстеллар"
        },
        {
            id: 1,
            title: "Легенда"
        }
    ];

    searchText = "";

    state = {
        films: []
    };
    /*listOfFilms = numbers.map((number) =>
        <li key={number.id}>
            {number}
        </li>
    );*/

    componentDidMount = async () => {
        /*//this.films = */console.log(await this.api.GetAllFilms());
        this.setState({films: this.films});
    }

    handleInputChange = (event) => {
        this.setState({
            films: this.films.filter((item) => (item.title == event.target.value))
        })
    }

    render = () => {
        return (
            <div className="films-page">
                <label>
                    Спписок фильмов
                </label>
                <input  type="text"
                        value={this.searchText}
                        onChange={this.handleInputChange}
                        placeholder="Поиск"
                        />
                {(this.state.films || []).map((item) =>(
                        <div key={item.id}>
                            <FilmComponent film={item} />
                        </div>
                    )
                )}
            </div>
        )
    }
}