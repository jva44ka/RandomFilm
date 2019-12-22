import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import apiService from '../../services/AuthenticationService';

import './styles.css';
import MainPage from "../MainPage";

export  default class LoginPage extends  React.Component{

    apiService = new apiService();

    state={
        login: "",
        password: "",
        token: ""
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    loginButtonOnClick = async() => {
        await this.apiService.login(this.state.login, this.state.password);
        let user = this.apiService.getCurrentUser();
        if (user){
            console.log("user: " + user);
            console.log("login: " + user.login);
            console.log("token: " + user.token);
            this.setState((prevState) => {
                return {
                    login: prevState.login,
                    password: prevState.password,
                    token: user.token
                }
            });
            this.state.token = user.token;
        }
        else{
            console.log('not found token');
        }
    };

    render(){
        console.log(this.apiService.getCurrentUser().login);
        if (this.apiService.getCurrentUser().login) return <Redirect to="/"/>
        return (
            <div className="login-page-grid">
                <label>Вход</label>
                <input  name="login"
                        value={this.state.login}
                        onChange={this.handleInputChange}
                        placeholder="Логин"
                />
                <input
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder="Пароль"
                />
                <button onClick={this.loginButtonOnClick}>Вход</button>
            </div>
        )
    }
}