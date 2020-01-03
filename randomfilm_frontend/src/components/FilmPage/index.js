import React from 'react';
import FilmApiService from '../../services/FilmApiService';
import LikesApiService from '../../services/LikesApiService';

import './styles.css'

export  default class FilmsPage extends  React.Component{

    filmApiService = new FilmApiService();
    likesApiService = new LikesApiService();

    state = {
        film: {},
        like: {},
        likeOrDislike: undefined,
        isLikeThere: false,
        comments: [],
    };

    componentDidMount = async() => {
        let film = await this.filmApiService.getSelectFilm();
        console.log(film);

        let like = await this.likesApiService.GetSelfLikeByFilmId(film.id);
        console.log(like);

        let likeOrDislike;
        let isLikeThere = false;
        if (like.id){
            likeOrDislike = like.likeOrDislike;
            isLikeThere = true;
        }

        this.setState({
            film: film,
            like: like,
            likeOrDislike: likeOrDislike,
            isLikeThere: isLikeThere,
        });
        console.log("likeOrDislike " + this.state.likeOrDislike);
        console.log("isLikeThere " + this.state.isLikeThere);
    }

    like = async() => {
        await this.likesApiService.PostSelfLike(this.state.film.id, true);
        let like = await this.likesApiService.GetSelfLikeByFilmId(this.state.film.id);
        this.setState({
            like: like,
            likeOrDislike: like.likeOrDislike,
            isLikeThere: true,
        });
    }

    dislike = async() => {
        await this.likesApiService.PostSelfLike(this.state.film.id, false);
        let like = await this.likesApiService.GetSelfLikeByFilmId(this.state.film.id);
        this.setState({
            like: like,
            likeOrDislike: like.likeOrDislike,
            isLikeThere: true,
        });
    }

    unLike = async() => {
        await this.likesApiService.DeleteSelfLike(this.state.film.id);
        this.setState({
            like: {},
            isLikeThere: false,
        });
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
                <label>{this.state.film.title}</label>
                <label>Трейлер</label>
                <label>{this.state.film.urlTrailer}</label>
                <label>Жанр</label>
                <label>{this.state.film.genre}</label>
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