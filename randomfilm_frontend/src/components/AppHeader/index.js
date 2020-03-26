import React from 'react';
import {Link} from "react-router-dom";
import logo from './logo_test50x50.png';
import './styles.css';
import AuthService from '../../services/AuthenticationService';
import {HEADER_LOGOUT_BUTTON_ONCLICK} from '../../actions/appHeaderActions';
import {connect} from "react-redux";

const authService = new AuthService();

const AppHeader = ({isAuth, logout}) => {
    return (
        <div>
            <header className="app-header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo">
                            <img src={logo} alt=""/>
                        </div>
                        <nav className="main-buttons">
                            <Link className="nav_link" to="/">Главная</Link>
                            <Link className="nav_link" to="/Films">Фильмы</Link>
                            <Link className="nav_link" to="/Actors">Актеры</Link>
                            <Link className="nav_link" to="/About">О Проекте</Link>
                        </nav>
                        {
                            authService.getCurrentUser().login || isAuth ?
                                (
                                    <nav className="auth-buttons">
                                        <Link className="nav_link" to="#">{authService.getCurrentUser().login}</Link>
                                        <Link className="nav_link login" onClick={logout} to="#">Выход</Link>
                                    </nav>
                                ) : (
                                    <nav className="auth-buttons">
                                        <Link className="nav_link login" to="/Login">Вход</Link>
                                    </nav>
                                )
                        }
                    </div>
                </div>
            </header>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch({type: HEADER_LOGOUT_BUTTON_ONCLICK})
    }
};

const mapStateToProps = (state) => {
    console.log('state of the header state is: ');
    console.log(JSON.stringify(state));
    return {
        isAuth: state.appHeaderReducer.isAuth
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);