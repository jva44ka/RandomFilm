import React from 'react';
import ReactPlayer from 'react-player';

import FilmApiService from '../../services/FilmApiService';
import LikesApiService from '../../services/LikesApiService';
import getGenresString from '../../services/genresStringify';

import './styles.css'

export  default class FilmsPage extends  React.Component{

    filmApiService = new FilmApiService();
    likesApiService = new LikesApiService();

    state = {
        film: {},
        like: {},
        genreString: "",
        likeOrDislike: undefined,
        isLikeThere: false,
        comments: [],
    };

    componentDidMount = async() => {
        window.scrollTo(0, 0);

        let film = FilmApiService.selectedFilm;
        console.log(film);

        let like = {};
        let likeResponse = await this.likesApiService.GetSelfLikeByFilmId(film.id);
        if (likeResponse.status === 200){
            like = await likeResponse.json();
        }
        console.log(like);

        let likeOrDislike;
        let isLikeThere = false;
        if (like.id){
            likeOrDislike = like.likeOrDislike;
            isLikeThere = true;
        }

        let genres = getGenresString(film);

        this.setState({
            film: film,
            like: like,
            genreString: genres,
            likeOrDislike: likeOrDislike,
            isLikeThere: isLikeThere,
        });
        console.log("likeOrDislike " + this.state.likeOrDislike);
        console.log("isLikeThere " + this.state.isLikeThere);
    };

    like = async() => {
        let likePostResponse = await this.likesApiService.PostSelfLike(this.state.film.id, true);
        if (likePostResponse.status === 200 || 201) {
            let currentLikeResponse = await this.likesApiService.GetSelfLikeByFilmId(this.state.film.id);
            if (currentLikeResponse.status === 200){
                let likeData = currentLikeResponse.json();
                this.setState({
                    like: likeData,
                    likeOrDislike: likeData.likeOrDislike,
                    isLikeThere: true,
                });
            }
        }
    }

    dislike = async() => {
        let likePostResponse = await this.likesApiService.PostSelfLike(this.state.film.id, false);
        if (likePostResponse.status === 200 || 201) {
            let currentLikeResponse = await this.likesApiService.GetSelfLikeByFilmId(this.state.film.id);
            if (currentLikeResponse.status === 200){
                let likeData = currentLikeResponse.json();
                this.setState({
                    like: likeData,
                    likeOrDislike: likeData.likeOrDislike,
                    isLikeThere: true,
                });
            }
        }
    }

    unLike = async() => {
        let response = await this.likesApiService.DeleteSelfLike(this.state.film.id);
        if (response.status === 200) {
            this.setState({
                like: {},
                isLikeThere: false,
            });
        }
    }

    likeOnClick = async() => {
        if(this.state.isLikeThere){
            if(this.state.likeOrDislike){
                await  this.unLike();
            }
            else {
                await  this.unLike();
                await this.like();
            }
        }
        else{
            await this.like();
        }
        console.log("likeOrDislike " + this.state.likeOrDislike);
        console.log("isLikeThere " + this.state.isLikeThere);
    }

    dislikeOnClick = async() => {
        if(this.state.isLikeThere){
            if(this.state.likeOrDislike){
                await this.unLike();
                await this.dislike();
            }
            else {
                await  this.unLike();
            }
        }
        else{
            await this.dislike();
        }
        console.log("likeOrDislike " + this.state.likeOrDislike);
        console.log("isLikeThere " + this.state.isLikeThere);
    }

    render = () => {
        let likeClassName = "likeButton_disabled";
        let dislikeClassName = "dislikeButton_disabled";

        if (this.state.isLikeThere){
            if (this.state.likeOrDislike){
                likeClassName = "likeButton_enabled";
            }
            else{
                dislikeClassName = "dislikeButton_enabled";
            }
        }

        return (
            <div className="film-page">
                <ReactPlayer
                    url={this.state.film.urlTrailer}
                    controls={true}
                    id="videoPlayer"
                    youtubeConfig={{ playerVars: { showinfo: 1 , autoplay: 0} }}
                    />
                <label id="filmTitle">{this.state.film.title}</label>
                <label>Жанр</label>
                <label>{this.state.genreString}</label>
                <label>Опсиание</label>
                <label>{this.state.film.description}</label>
                <label>Длительность</label>
                <label>{this.state.film.duration}</label>
                <label>Год</label>
                <label>{this.state.film.year}</label>
                <label>Продюссер</label>
                <label>{this.state.film.director}</label>

                <button className={likeClassName}
                        id="likeButton"
                        onClick={this.likeOnClick}/>

                <button className={dislikeClassName}
                        id="dislikeButton"
                        onClick={this.dislikeOnClick} />
            </div>
        );
    }
}