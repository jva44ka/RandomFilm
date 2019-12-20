import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import MainPage from '../MainPage';
import FilmsPage from '../FilmsPage';
import LoginPage from '../LoginPage';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader/>
                    <Route path="/" component={MainPage} exact/>
                    <Route path="/Films" component={FilmsPage}/>
                    <Route path="/Login" component={LoginPage}/>
                <AppFooter/>
            </div>
        </Router>
    );
}

export default App;
