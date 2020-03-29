import React from 'react';

import FilmComponent from './FilmListItem';

import loadingImg from '../../generalResources/loadingGif.svg';

import {FILMSPAGE_CHANGE_INPUT, getFilms} from './../../actions/filmsListPageAction';

import './styles.css'
import {connect} from "react-redux";

class FilmsPage extends  React.Component{

    componentDidMount = () => {
        this.props.getFilms();
    };

    render = () => {
        return (
            <div className="filmsPageContainer">
                {this.props.loading ? (
                    <div className="loadingImgDiv">
                        <img src={loadingImg}/>
                    </div>
                ) : (
                    <div className="films-list">
                        <label>
                            Список фильмов
                        </label>
                        <input  type="text"
                                name="searchText"
                                value={this.props.searchText}
                                onChange={this.props.handleInputChange}
                                placeholder="Поиск"
                        />
                        {
                            (this.props.filmsShowed || []).map((item) => (
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

const mapDispatchToProps = (dispatch) => {
    return{
        handleInputChange: (event) => dispatch({type: FILMSPAGE_CHANGE_INPUT, payload: event}),
        getFilms: () => dispatch(getFilms())
    }
};

const mapStateToProps = (state) => {
    return {
        isFilmSelected: state.filmsListPageReducer.isFilmSelected,
        films: state.filmsListPageReducer.films,
        filmsShowed: state.filmsListPageReducer.filmsShowed,
        loading: state.filmsListPageReducer.loading,
        searchText: state.filmsListPageReducer.searchText,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsPage);