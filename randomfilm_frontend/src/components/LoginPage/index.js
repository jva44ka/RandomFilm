import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import apiService from '../../services/AuthenticationService';

import './styles.css';

export  default class LoginPage extends  React.Component{

    apiService = new apiService();

    state={
        login: "",
        password: ""
    };

    loginOnClick = () =>{
        this.apiService.login(this.state.login, this.state.password);
        let user = this.apiService.getCurrentUser();
        if (user){
            console.log(user.login);
        }
        else{
            console.log('not found token');
        }
    };

    render(){
        return (
            <Route>
                <div className="page-grid">
                    <label>Логин</label>
                    <input content={this.state.login}/>
                    <label>Пароль</label>
                    <input content={this.state.password}/>
                    <button onClick={this.loginOnClick} content="Вход"></button>
                </div>
            </Route>
        )
    }
}