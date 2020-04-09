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
import AppFooter from '../../components/AppFooter';
import MainPage from '../../components/MainPage';
import FilmPage from '../FilmPage';
import FilmsPage from '../FilmsPage';
import LoginPage from '../LoginPage';

import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader/>
                    <Route path="/" component={MainPage} exact/>
                    <Route path="/Film/:id" component={FilmPage}/>
                    <Route path="/Films" component={FilmsPage}/>
                    <Route path="/Login" component={LoginPage}/>
                <AppFooter/>
            </div>
        </Router>
    );
}

export default App;
