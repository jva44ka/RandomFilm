// index.js
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';

import rootReducer from './reducers'
import * as serviceWorker from './services/serviceWorker';

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWare = composeEnhanser(
    applyMiddleware(thunk)
);

const store = createStore(rootReducer, middleWare);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();