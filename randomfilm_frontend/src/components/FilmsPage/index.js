import React from 'react';

import FilmComponent from '../FilmListItem';
import apiService from '../../services/FilmApiService'

import loadingImg from '../GeneralResources/loadingGif.svg';

import './styles.css'

export  default class FilmsPage extends  React.Component{

    api = new apiService();

    films = [];

    state = {
        isFilmSelected: false,
        films: [],
        loading: false,
        searchText: "",
    };

    componentDidMount = async () => {
        this.setState({loading: true});
        let response = await this.api.GetAllFilms();
        console.log("status is " + response.status);
        if (response.status === 200){
            this.films = await response.json();
        }
        console.log(this.films);
        this.setState({
            films: this.films,
            loading: false
        });
    }

    handleInputChange = (event) => {
        this.setState({
            searchText: event.target.value,
            films: this.films.filter((item) => (item.title.toLowerCase().includes(event.target.value.toLowerCase())))
        })
    }

    render = () => {
        return (
            <div>
                {this.state.loading ? (
                    <div className="loadingImgDiv">
                        <img src={loadingImg}/>
                    </div>
                ) : (
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
                                    <FilmComponent film={item}/>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        )
    }
}