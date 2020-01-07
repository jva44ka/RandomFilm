import React from 'react';
import FilmMiniView from '../FilmMiniView';
import FilmFullView from '../FilmFullView';

import './FilmComponent.css';

import loadingImg from '../GeneralResources/loadingGif.svg';

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
        mini: true,
        loading: false
    };

    onButtonClick = async() => {
        this.setState({
            loading: true
        });
        const result = await this.props.FilmSelectFunc();
        //const response = await this.props.FilmSelectFunc();
        //const result = await response.json();
        console.log(result);
        console.log(result.id);
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
            mini: true,
            loading: false
        });
    };

    ChangeViewSize = () => {
        this.setState((state) => {
            return{
                mini: !state.mini
            }
        })
    };

    render (){

        return (
            <div>
                {!this.state.loading ? (
                    <div>
                        {this.state.showed?
                            (
                                <div className="FilmComponent">
                                    {this.state.mini?(
                                        <FilmMiniView
                                            film={this.state}
                                            FilmViewClick={this.ChangeViewSize}/>
                                    ):(
                                        <FilmFullView
                                            film={this.state}
                                            FilmViewClick={this.ChangeViewSize}/>
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
                ) : (
                    <div className="FilmComponent">
                        <img src={loadingImg} id="loadingImg" width="200" height="200"/>
                    </div>
                )}
            </div>
        )
    }
}