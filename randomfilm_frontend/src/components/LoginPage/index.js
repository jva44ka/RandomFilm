import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import ApiService from '../../services/AuthenticationService';

import './styles.css';

class LoginPage extends  React.Component{

    apiService = new ApiService();

    render(){
        console.log(this.apiService.getCurrentUser().login);
        if (this.apiService.getCurrentUser().login) return <Redirect to="/"/>;
        return (
            <div className="login-page-grid">
                    <form   className="box"
                            action=""
                            onSubmit={(e) => {
                                this.props.onFormSubmit(e);
                                this.forceUpdate();
                            }}>
                    <h1>Войти</h1>
                    <input type="text"
                           name="login"
                           value={this.props.login}
                           onChange={this.props.handleInputChange}
                           placeholder="Логин"/>

                    <input type="password"
                           name="password"
                           value={this.props.password}
                           onChange={this.props.handleInputChange}
                           placeholder="Пароль"/>

                    {this.props.validationMessage ? (
                        <label id="validationMessage">
                            {this.props.validationMessage}
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

const mapDispatchToProps = (dispatch) => {
    return{
        handleInputChange: (event) => dispatch({type: 'LoginPage_HandleInputChange', payload: event}),
        onFormSubmit: (event) => dispatch({type: 'LoginPage_OnFormSubmit', payload: event})
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        password: state.password,
        validationMessage: state.validationMessage
    };
}

export  default connect(mapStateToProps, mapDispatchToProps)(LoginPage);