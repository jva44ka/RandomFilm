import React from 'react';
import {Link} from "react-router-dom";
import './styles.css';

import reactImg from '../../logo.svg';
import dotnetImg from './dotnet.png';


function AppHeader() {
  return (
      <footer className="AppFooter">

          <ul className="frameworks-emblems">
              <li>
                  <img src={reactImg} className="react-logo"/>
              </li>
              <li>
                  <img src={dotnetImg} className="dotnet-logo"/>
              </li>
          </ul>
      </footer>
  );
}

export default AppHeader;
