// index.js
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';

import rootReducer from './reducers'
import * as serviceWorker from './services/serviceWorker';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();