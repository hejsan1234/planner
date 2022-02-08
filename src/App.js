import './App.css';
import { TodoList } from './components/Todolist/Todolist.component';
import SignIn from './components/sign-in/sign-in.page';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './components/firebase/firebase';

import firebase from './components/firebase/firebase';
import { doc, setDoc, collection, addDoc, getDoc, query, where } from "firebase/firestore"; 
import { db } from './components/firebase/firebase';

function App() {

  // Implementing firebase in project //


  const setUserTodos = async () => {
    await setDoc(doc(db, "users", `${user.uid}`), {
      todos: todos,
      completedTodos: completedTodo
    });
  }

  const getUserTodos = async () => {
    if (user) {
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const bothTodos = docSnap.data()
        bothTodos.todos.map((e) => {
          setTodos([e])
        })
        bothTodos.completedTodos.map((event) => {
          setCompletedTodo([event])
        })
      } else {
        console.log('there was an error retrieving your data')
      }
    }
  }


  // firebase implement

  const [todos, setTodos] = useState([]);

  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    if (user) {
      getUserTodos();
    }
  }) 

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <Routes>
      <Route path='/' element={<TodoList getUserTodos={getUserTodos} setUserTodos={setUserTodos} user={user} signOut={logout} login={login} todos={todos} setTodos={setTodos} completedTodo={completedTodo} setCompletedTodo={setCompletedTodo} />} />
      <Route path='/SignIn' element={<SignIn {... { register, login, logout, registerEmail, registerPassword, loginEmail, loginPassword, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword}} />} />
    </Routes>
  );
}

export default App;
