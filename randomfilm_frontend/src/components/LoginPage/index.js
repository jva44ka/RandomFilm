import React from 'react';
import { Redirect } from "react-router-dom";
import ApiService from '../../services/AuthenticationService';

import './styles.css';

export  default class LoginPage extends  React.Component{

    apiService = new ApiService();

    state={
        login: "",
        password: "",
        validationMessage: ""
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onFormSubmit = async(e) => {
        e.preventDefault();
        let response = await this.apiService.login(this.state.login, this.state.password);
        if (response.status === 200){
            let user = this.apiService.getCurrentUser();
            console.log("user: " + user);
            console.log("login: " + user.login);
            console.log("token: " + user.token);
            this.setState((prevState) => {
                return {
                    login: prevState.login,
                    password: prevState.password
                }
            });
            window.location.reload();
        }
        else{
            if (response.status === 404){
                this.setState({validationMessage: "Неверный логин/пароль"});
            }
            if (response.status === 500){
                this.setState({validationMessage: "Ошибка сервера"});
            }

            //Другая ошибка
            if(this.state.validationMessage === ""){
                this.setState({validationMessage: "Неопознаная ошибка"});
            }
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

                    {this.state.validationMessage ? (
                        <label id="validationMessage">
                            {this.state.validationMessage}
                        </label>
                    ):(
                        <div/>
                    )}

                    <button name="submit"
                            type="submit">Войти</button>
                    <br/>
                </form>
            </div>
        )
    }
}