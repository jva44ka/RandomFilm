import React from 'react';
import logo from '../../logo.svg';
import './App-header.css';

function AppHeader() {
  return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <ul className="header-buttons">
              <li>
                  <a href="/">Главная</a>
              </li>
              <li>
                  <a href="/Films">Фильмы</a>
              </li>
              <li>
                  <a href="/Actors">Актеры</a>
              </li>
          </ul>
      </header>
  );
}

export default AppHeader;
