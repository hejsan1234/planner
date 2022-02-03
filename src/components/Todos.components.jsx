import React from 'react';
import Todo from './Todo.component';

const Todos = ({ todos, removeTodo, completeTodo, addCompletedTodo }) => {

  return(
    <div>
        {todos.map(todo => (
          <Todo 
          key={todo.id}
          removeTodo={removeTodo}
          text={todo.text}
          todo={todo}
          completeTodo={completeTodo}
          addCompletedTodo={addCompletedTodo}
          />
        ))}
    </div>
  )
};

export default Todos;
