import React, { useState } from 'react';
import Todos from './Todos.components';
import { v4 as uuidv4 } from 'uuid';
import CompletedTodos from './CompletedTodos.components';

export const TodoList = () => {

    const [todo, setTodo] = useState({
        text: '',
        id: '', 
        completed: false
    });

    const [todos, setTodos] = useState([]);

    const [completedTodo, setCompletedTodo] = useState([]);


    const getTodo = (e) => {
        setTodo({text: e.target.value})
    }

    const addTodos = (todo) => {
        setTodos([todo, ...todos])
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
        console.log(completedTodo)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={getTodo} value={todo.text} ></input>
                <ul>
                    <Todos 
                    todos={todos}
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                    addCompletedTodo={addCompletedTodo}
                    />
                </ul>
                <input type="submit"></input>
            </form>
            <ul>
                <CompletedTodos completedTodo={completedTodo} />
            </ul>
        </div>
    )
};
