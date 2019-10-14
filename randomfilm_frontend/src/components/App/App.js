import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import AppHeader from '../App-header/App-header';
import MainPage from '../MainPage';
import FilmsPage from '../FilmsPage';

function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader/>
                <Route path="/" component={MainPage} exact/>
                <Route path="/Films" component={FilmsPage}/>
            </div>
        </Router>
    );
}

export default App;
