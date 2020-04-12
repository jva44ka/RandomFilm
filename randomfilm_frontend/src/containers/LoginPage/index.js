import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import ApiService from '../../services/AuthenticationService';
import { getToken } from "../../actions/loginPageActions";
import PrimaryButton from '../../components/PrimaryButton';

import './styles.css';

const apiService = new ApiService();

const LoginPage = ({login, password, validationMessage, handleInputChange, requestToken}) => {
    if (apiService.getCurrentUser().login) return <Redirect to="/"/>;
    return (
        <div className="login-page-grid">
                <form   className="box"
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            requestToken(login, password);
                        }}>
                <h1>Войти</h1>
                <input type="text"
                       name="login"
                       value={login}
                       onChange={handleInputChange}
                       placeholder="Логин"/>

                <input type="password"
                       name="password"
                       value={password}
                       onChange={handleInputChange}
                       placeholder="Пароль"/>

                {validationMessage ? (
                    <label id="validationMessage">
                        {validationMessage}
                    </label>
                ):(
                    <div/>
                )}

                <div className="submit-container">
                    <PrimaryButton content="Войти"/>
                </div>
                <br/>
            </form>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return{
        handleInputChange: (event) => dispatch({type: 'LoginPage_HandleInputChange', payload: event}),
        requestToken: (login, password) => dispatch(getToken(login, password))
    }
};

const mapStateToProps = (state) => {
    return {
        login: state.loginPageReducer.login,
        password: state.loginPageReducer.password,
        validationMessage: state.loginPageReducer.validationMessage,
        flagForRender: state.loginPageReducer.flagForRender
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);