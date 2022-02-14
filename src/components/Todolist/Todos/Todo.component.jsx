import React from 'react';

import './todo.styles.css'

const Todo = ({ day, text, removeTodo, todo, completeTodo, addCompletedTodo}) => {

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
        <div className='list-item-wrapper'>
          <input className='complete-button' type='button' onClick={completed} value='Complet' ></input>
          {
            todo.day != 'all' ? <p className='date-done'>Done by {todo.day}</p>
            : <p className='date-done'></p>
          }
        </div>
    </div>
  ) 
};

export default Todo;
