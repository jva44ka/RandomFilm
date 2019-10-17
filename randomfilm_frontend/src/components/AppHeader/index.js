import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
import './App-header.css';


function AppHeader() {
  return (
      <header className="App-header">
          <ul className="header-buttons">
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
      </header>
  );
}

export default AppHeader;
