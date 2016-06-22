import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore } from 'redux';
import AppReducers from './reducers/index';
import App from './app.jsx';
import AppContainer from './appContainer.js';


import { Router,Route,  browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const defaultStore={
    todos: [
        {
            label: 'aaa',
            completed: false,
            id: 0
        },
        {
            label: 'bbb',
            completed: false,
            id: 1
        },
        {
            label: 'ccc',
            completed: true,
            id: 2
        }
    ],
    inputChange: '',
    filterTodos: 'all'
};

let store=createStore(AppReducers,defaultStore,window.devToolsExtension && window.devToolsExtension());
const history=syncHistoryWithStore(browserHistory,store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/*" component={AppContainer}/>            
        </Router>
        
    </Provider>,
    document.getElementById('example')
);