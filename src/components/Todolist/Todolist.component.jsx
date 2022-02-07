import React, { useState, useEffect } from 'react';
import Todos from './Todos/Todos.components';
import { v4 as uuidv4 } from 'uuid';
import CompletedTodos from './Completed-todos/CompletedTodos.components';

import './Todolist.styles.css'
import { Link } from 'react-router-dom';

import { auth } from '../firebase/firebase';


export const TodoList = ({ user, signOut }) => {

    const [todo, setTodo] = useState({
        text: '',
        id: '', 
        completed: false
    });

    const [todos, setTodos] = useState([]);

    const [completedTodo, setCompletedTodo] = useState([]);

    const current = new Date();

    const [list, setList] = useState(false);

    const getTodo = (e) => {
        setTodo({text: e.target.value})
    }

    const addTodos = (todo) => {
        if (todo.text === '') {
            alert('you need to provide some text')
        } else {
            setTodos([todo, ...todos])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodos({...todo, id: uuidv4()})
        setTodo({...todo, text: ''})
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const completeTodo = (id) => {
        setTodos(
            todos.map(todo => {
                if(todo.id === id) {
                    return{
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })
        )
    }

    const addCompletedTodo = (id) => {
        todos.map(todo => {
            if (todo.id === id) (
                setCompletedTodo([todo, ...completedTodo])
            )
        })
    }

    const myClick = (e) => {
        if (e.target.innerText === 'All') {
            setList(false)
        } else {
            setList(true)
        }
    }

    return (
        <div className='container'>
            <div className='form-container'>
                <nav className='todo-navbar'>
                    <div className='sign-in-wrapper'>
                        {
                            user ? <p onClick={signOut}>Sign out</p>: <Link to='/SignIn' className='sign-in'>Sign in</Link>
                        }
                    </div>
                </nav>
                <form onSubmit={handleSubmit} className=''>
                    <h1 className='date'>{`${current.getDay() === 5 ? 'Friday' : 'not friday'}`}</h1>
                    <input type="text" onChange={getTodo} value={todo.text} placeholder='Add new task...' className='form-input' ></input>
                    <br />
                    <input className='submit-btn' type="submit" value='Submit Task' ></input>
                    <div className='toggle-wrapper'>
                        <h2 className='toggle-list' onClick={myClick}>All</h2>
                        <h2 className='toggle-list' onClick={myClick}>Completed</h2>
                    </div>
                    <ul>
                        {list === false ? 
                        <Todos 
                        todos={todos}
                        removeTodo={removeTodo}
                        completeTodo={completeTodo}
                        addCompletedTodo={addCompletedTodo}
                        /> : <CompletedTodos
                        completedTodo={completedTodo} />}
                    </ul>
                </form>
            </div>
        </div>
    )
};
