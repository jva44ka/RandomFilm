import React from 'react';
import {connect} from "react-redux";

import FilmComponent from '../../components/FilmListItem';
import {FILMSPAGE_CHANGE_INPUT, getFilms} from './../../actions/filmsPageActions';

import loadingImg from '../../generalResources/loadingGif.svg';
import './styles.css'

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
                                placeholder="Поиск"/>
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
        films: state.filmsPageReducer.films,
        filmsShowed: state.filmsPageReducer.filmsShowed,
        loading: state.filmsPageReducer.loading,
        searchText: state.filmsPageReducer.searchText,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmsPage);