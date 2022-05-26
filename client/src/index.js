import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { applyMiddleware , compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk';
import App from './App';

const store = configureStore({reducer}, compose( applyMiddleware(thunk)))

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
        );