import React, { useState } from 'react';
import Todos from './Todos.components';

export const TodoList = () => {

    const [todo, setTodo] = useState({
        text: '',
        id: '', 
        completed: false
    });

    const [todos, setTodos] = useState([]);

    const getTodos = (e) => {
        setTodo({text: e.target.value})
    }

    const addTodos = (todo) => {
        setTodos([todo, ...todos])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addTodos({...todo})
        setTodo({todo , text: ''})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={getTodos} ></input>
                <ul>
                    <Todos todos={todos} />
                </ul>
                <input type="submit"></input>
            </form>
        </div>
    )
};
