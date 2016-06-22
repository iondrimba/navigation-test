import { combineReducers } from 'redux';
import todos from './todos';
import addTodo from './addTodo';
import filterTodos from './filterTodos';
import inputChange from './inputChange';
import { routerReducer } from 'react-router-redux';

const AppReducers=combineReducers({
    todos,
    addTodo,
    filterTodos,
    inputChange,
    routing:routerReducer
});

export default AppReducers;