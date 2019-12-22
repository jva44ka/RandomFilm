import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
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
            <header className="App-header">
                <ul className="main-buttons">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/Films">Фильмы</Link>
                    </li>
                    <li>
                        <Link to="/Actors">Актеры</Link>
                    </li>
                </ul>
                {
                    this.apiService.getCurrentUser().login ?
                        (
                            <ul className="auth-buttons">
                                <li>
                                    <Link to="#">Профиль</Link>
                                </li>
                                <li>
                                    <Link onClick={this.logout} to="#">Выход</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="auth-buttons">
                                <li>
                                    <Link to="/Login">Вход</Link>
                                </li>
                            </ul>
                        )
                }
            </header>
        );
    }
}