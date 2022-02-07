import React from 'react';

import './todo.styles.css'

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
    <div className='todo-container'>
        <li className='list-item' >{text}</li>
        <input className='complete-button' type='button' onClick={completed} value='Complet' ></input>
    </div>
  ) 
};

export default Todo;
