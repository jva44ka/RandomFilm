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

    onFormSubmit = async(e) => {
        e.preventDefault();
        await this.apiService.login(this.state.login, this.state.password);
        let user = this.apiService.getCurrentUser();
        if (user.login){
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
            window.location.reload();
        }
        else{
            console.log('not found token');
        }
    };

    render(){
        console.log(this.apiService.getCurrentUser().login);
        if (this.apiService.getCurrentUser().login) return <Redirect to="/"/>;
        return (
            <div className="login-page-grid">
                <form   className="box"
                        action=""
                        onSubmit={this.onFormSubmit}>
                    <h1>Войти</h1>
                    <input type="text"
                           name="login"
                           value={this.state.login}
                           onChange={this.handleInputChange}
                           placeholder="Логин"/>

                    <input type="password"
                           name="password"
                           value={this.state.password}
                           onChange={this.handleInputChange}
                           placeholder="Пароль"/>

                    <button name="submit"
                            type="submit"
                            onClick={this.loginButtonOnClick}>Войти</button>
                    <br/>
                </form>
            </div>
        )
    }
}