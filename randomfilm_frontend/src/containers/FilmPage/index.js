import React from 'react';
import {connect} from "react-redux";
import ReactPlayer from 'react-player';

import {getFilm, getLike, getFilmAndLike, onLikeClick, onDislikeClick} from "../../actions/filmPageActions";

import './styles.css'

class FilmPage extends  React.Component{

    componentDidMount = () => {
        window.scrollTo(0, 0);

        let paramId = this.props.match.params.id;

        this.props.getFilmAndLike(paramId);
    };

    render = () => {
        let likeClassName = "likeButton_disabled";
        let dislikeClassName = "dislikeButton_disabled";

        if (this.props.isLikeThere){
            if (this.props.likeOrDislike){
                likeClassName = "likeButton_enabled";
            }
            else{
                dislikeClassName = "dislikeButton_enabled";
            }
        }

        return (
            <div className="film-page">
                <ReactPlayer
                    url={this.props.film.urlTrailer}
                    controls={true}
                    id="videoPlayer"
                    youtubeConfig={{ playerVars: { showinfo: 1 , autoplay: 0} }}/>
                <label id="filmTitle">{this.props.film.title}</label>
                <label>Жанр</label>
                <label>{this.props.genreString}</label>
                <label>Опсиание</label>
                <label>{this.props.film.description}</label>
                <label>Длительность</label>
                <label>{this.props.film.duration}</label>
                <label>Год</label>
                <label>{this.props.film.year}</label>
                <label>Продюссер</label>
                <label>{this.props.film.director}</label>

                <button className={likeClassName}
                        id="likeButton"
                        onClick={() => this.props.onLikeClick(this.props.film.id, this.props.isLikeThere,this.props.likeOrDislike)}/>

                <button className={dislikeClassName}
                        id="dislikeButton"
                        onClick={() => this.props.onDislikeClick(this.props.film.id, this.props.isLikeThere,this.props.likeOrDislike)} />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        onLikeClick: (filmId, isLikeThere, likeOrDislike) => dispatch(onLikeClick(filmId, isLikeThere, likeOrDislike)),
        onDislikeClick: (filmId, isLikeThere, likeOrDislike) => dispatch(onDislikeClick(filmId, isLikeThere, likeOrDislike)),
        getFilmAndLike: (filmId) => dispatch(getFilmAndLike(filmId)),
    }
};

const mapStateToProps = (state) => {
    return {
        film: state.filmPageReducer.film,
        like: state.filmPageReducer.like,
        genreString: state.filmPageReducer.genreString,
        likeOrDislike: state.filmPageReducer.likeOrDislike,
        isLikeThere: state.filmPageReducer.isLikeThere,
        comments: state.filmPageReducer.comments,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);