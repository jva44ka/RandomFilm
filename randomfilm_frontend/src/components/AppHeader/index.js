import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
import './App-header.css';
import authService from '../../services/AuthenticationService';

function AppHeader() {
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
              localStorage.getItem('currentUser') != null?
              (
                  <ul className="auth-buttons">
                      <li>
                          <Link to="#">Профиль</Link>
                      </li>
                      <li>
                          <Link to="#">Выход</Link>
                      </li>
                  </ul>
              ):(
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

export default AppHeader;
