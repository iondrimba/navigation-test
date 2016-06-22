import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addTodo from './actions/addTodo';
import filterTodos from './actions/filterTodos';
import inputChange from './actions/inputChange';
import toggleTodo from './actions/toggleTodo';
import TodoApp from './todoApp.jsx';


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
  }
};

function mapStateToProps(state) {
  return {
    todos:getVisibleTodos(state.todos, state.filterTodos),
    addTodo:state.addTodo,
    inputChange:state.inputChange, 
    filterTodos: state.filterTodos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodoActions: bindActionCreators(addTodo,dispatch),
    filterTodosActions: bindActionCreators(filterTodos, dispatch),
    inputChangeActions: bindActionCreators(inputChange, dispatch),
    toggleTodoActions: bindActionCreators(toggleTodo, dispatch)
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

export default AppContainer;
