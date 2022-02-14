import React, { useState, useEffect } from 'react';
import Todos from './Todos/Todos.components';
import { v4 as uuidv4 } from 'uuid';
import CompletedTodos from './Completed-todos/CompletedTodos.components';
import Clock from '../Clock/Clock.component';
import Dates from '../Date/date.component';
import DropDown from 'react-dropdown';
import 'react-dropdown/style.css'
import Days from '../Days/days.component';

import './Todolist.styles.css'
import { Link } from 'react-router-dom';

import { auth } from '../firebase/firebase';


export const TodoList = ({ nextDay, lastDay, day, getUserTodos, setUserTodos, user, logout, todos, setTodos, completedTodo, setCompletedTodo }) => {

    const [todo, setTodo] = useState({
        text: '',
        id: '',
        day: 'all', 
        completed: false
    });

    const [list, setList] = useState(false);

    const getTodo = (e) => {
        setTodo({...todo, text: e.target.value})
    }
    
    const getDay = (e) => {
        setTodo({...todo, day: e.currentTarget.value})
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
        setTodo({...todo, text: '', day: 'all'})
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
            return todo
        })
    }

    // setting what list to render

    const [showDays, setShowDays] = useState(false)

    const myClick = (e) => {
        if (e.target.innerText === 'All') {
            setList(false)
            setShowDays(false)
        } else {
            setList(true)
            setShowDays(false)
        }
    }

    const setDaysFunc = () => {
        setShowDays(!showDays)
    }

    // end of functions to set the list to render


    // day dropdown

    const options = [
        'all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ]

    const defaultOption = options[0];

    const whatDay = (e) => {
        console.log(e.value)
    }

    /* for dropdown https://www.npmjs.com/package/react-dropdown */

    return (
        <div className='container'>
            <div className='form-container'>
                <nav className='todo-navbar'>
                    <Clock />
                    <div className='sign-in-wrapper'>
                        {
                            user ? <p onClick={logout} className='sign-out'>Sign out</p> : <Link to='/SignIn' className='sign-out' >Sign in</Link>
                        }
                    </div>
                </nav>
                <form onSubmit={handleSubmit} className=''>
                    <div className='day-wrapper'>
                        <div onClick={lastDay} className='inclosing'>{'<'}</div>
                        <h1 className='day'>{day}</h1>
                        <div onClick={nextDay} className='inclosing'>{'>'}</div>
                    </div>
                    <Dates />
                    <input type="text" onChange={getTodo} value={todo.text} placeholder='Add new task...' className='form-input' ></input>
                    <br />
                    <Days options={options} getDay={getDay} />
                    <input className='submit-btn' type="submit" value='Submit Task' ></input>
                    <div className='toggle-wrapper'>
                        <h2 className='toggle-list' onClick={myClick}>All</h2>
                        <h2 className='toggle-list' onClick={setDaysFunc}>Days</h2>
                        <h2 className='toggle-list' onClick={myClick}>Completed</h2>
                    </div>
                    <ul>
                        {list === false && showDays === false? 
                        <Todos 
                        todos={todos}
                        removeTodo={removeTodo}
                        completeTodo={completeTodo}
                        addCompletedTodo={addCompletedTodo}
                        day={day}
                        /> : list === true && showDays === false ? <CompletedTodos
                        completedTodo={completedTodo} />
                        : <Todos 
                            todos={todos.filter(todos => todos.day === day.toLowerCase())}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo}
                            addCompletedTodo={addCompletedTodo}
                            day={day}
                            />}
                    </ul>
                </form>
            </div>
        </div>
    )
};
