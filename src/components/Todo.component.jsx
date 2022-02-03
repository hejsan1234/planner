import React from 'react';

const Todo = ({ text, removeTodo, todo, completeTodo, addCompletedTodo}) => {

  //const remove = () => {
   //   removeTodo(todo.completed)
  //}  

  const completed = () => {
    completeTodo(todo.id)
    addCompletedTodo(todo.id)
    removeTodo(todo.id)

  }

  return(
    <div>
        <li>{text}</li>
        <input type='button' onClick={completed}></input>
    </div>
  ) 
};

export default Todo;
