import './App.css';
import { TodoList } from './components/Todolist/Todolist.component';
import SignIn from './components/sign-in/sign-in.page';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './components/firebase/firebase';

import firebase from './components/firebase/firebase';

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
      <Route path='/' element={<TodoList user={user} signOut={logout} login={login} />} />
      <Route path='/SignIn' element={<SignIn {... { register, login, logout, registerEmail, registerPassword, loginEmail, loginPassword, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword}} />} />
    </Routes>
  );
}

export default App;
