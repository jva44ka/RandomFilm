import React from 'react';
import {Link} from "react-router-dom";
import logo from './logo.png';
import './App-header.css';
import authService from '../../services/AuthenticationService';

export default class AppHeader extends React.Component {

    apiService = new authService();
    state = {isAuth: false};

    logout = async() => {
        this.setState({isAuth: false});
        await this.apiService.logout();
    }

    render() {
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
                                this.apiService.getCurrentUser().login ?
                                    (
                                        <nav className="auth-buttons">
                                            <Link className="nav_link" to="#">{this.apiService.getCurrentUser().login}</Link>
                                            <Link className="nav_link login" onClick={this.logout} to="#">Выход</Link>
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
    }
}