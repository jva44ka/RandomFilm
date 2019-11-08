// index.js
import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './services/serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import redusers from './store/reducers';


let store = createStore(redusers);

let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
