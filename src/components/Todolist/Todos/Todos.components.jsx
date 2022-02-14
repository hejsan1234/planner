import React from 'react';
import Todo from './Todo.component';

const Todos = ({ day, todos, removeTodo, completeTodo, addCompletedTodo }) => {

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
          day={day}
          />
        ))}
    </div>
  )
};

export default Todos;
