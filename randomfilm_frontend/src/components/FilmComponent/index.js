import React from 'react';
import FilmMiniView from '../FilmMiniView';
import FilmFullView from '../FilmFullView';

import './FilmComponent.css';

export  default class FilmComponent extends  React.Component{
    state={
        id:     null,
        title:  null,
        duration:   null,
        genre:  null,
        description: null,
        year:   null,
        director:   null,
        urlImg:     null,//'https://www.okino.ua/media/var/news/2019/01/11/avengers-infinity-war-poster.jpg',
        urlTrailer: null,
        showed: false,
        mini: true
    };

    onButtonClick = () => {
        const result = this.props.FilmSelectFunc();
        console.log(result);
        this.setState({
            id: result.id,
            title: result.title,
            duration: result.duration,
            genre: result.genre,
            description: result.description,
            year: result.year,
            director: result.director,
            urlImg: result.urlImg,
            urlTrailer: result.urlTrailer,
            showed: true,
            mini: true
        });
    };

    OpenFullView = () => {
        this.setState((state) => {
            return{
                id: state.id,
                title: state.title,
                duration: state.duration,
                genre: state.genre,
                description: state.description,
                year: state.year,
                director: state.director,
                urlImg: state.urlImg,
                urlTrailer: state.urlTrailer,
                showed: state.showed,
                mini: !state.mini
            }
        })
    };

    render(){

        return (
            <div>
                {this.state.showed?
                    (
                        <div className="FilmComponent">
                            {this.state.mini?(
                                    <FilmMiniView
                                        film={this.state}
                                        /*film={{ title,
                                                urlImg} = this.state}*/
                                        FilmViewClick={this.OpenFullView}/>
                                ):(
                                    //<FilmView film={...{title, duration, genre, description, year, director, urlImg, urlTrailer} = this.state}/>
                                    <FilmFullView
                                        film={this.state}
                                        FilmViewClick={this.OpenFullView}/>
                                )}
                            <div className="FilmComponent-Flex">
                                <button id="GetFilmButton" onClick={this.onButtonClick}>Еще фильм</button>
                            </div>
                        </div>
                    ):(
                        <div className="FilmComponent-Flex">
                            <button id="GetFilmButton" onClick={this.onButtonClick}>Получить фильм</button>
                        </div>
                    )
                }
            </div>
        )
    }
}