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

  const [rememberedTodos, setRememberedTodos] = useState(false)

  const setUserTodos = async () => {
    if (user) {
      await setDoc(doc(db, "users", `${user.uid}`), {
        todos: todos,
        completedTodos: completedTodo
      });
    }
  }

  const getUserTodos = async () => {
    if (user) {
      const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const bothTodos = docSnap.data()
        const myList = []
        bothTodos.todos.map((e) => {
          myList.push(e)
        })
        const myList2 = []
        bothTodos.completedTodos.map((event) => {
          myList2.push(event);
        })
        setTodos(myList);
        setCompletedTodo(myList2);
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
  }, [rememberedTodos]) 

  useEffect (() => {
    setUserTodos()
  }, [todos, completedTodo]) 

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const [day, setDay] = useState('');
  const [dayCounter, setDayCounter] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setRememberedTodos(true);
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
      setRememberedTodos(true);
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  // checkdate function 

  const [gottenDay, setGottenDay] = useState(false)

  const getDay = () => {
    if (gottenDay === false) {
      const current = new Date();
      const day = current.getDay();
      setGottenDay(true)
      setDayCounter(day)
    } else {

      if(dayCounter === 1) {
        setDay('Monday')
      } else if (dayCounter === 2) {
        setDay('Tuesday')
      } else if (dayCounter === 3) {
        setDay('Wednesday')
      } else if (dayCounter === 4) {
        setDay('Thursday')
      } else if (dayCounter === 5) {
        setDay('Friday')
      } else if (dayCounter === 6) {
        setDay('Saturday')
      } else {
        setDay('Sunday')
      }
    }
  }

  const nextDay = () => {
    if (dayCounter < 6) {
      setDayCounter(dayCounter + 1)
    } else {
      setDayCounter(0)
    }
  }

  const lastDay = () => {
    if (dayCounter > 0) {
      setDayCounter(dayCounter - 1)
    } else {
      setDayCounter(6)
    }
  }

  // end of this function

  useEffect(() => {
    getDay();
  }, [dayCounter])

  return (
    <Routes>
      <Route path='/' element={<TodoList {...{ lastDay, nextDay, day, getUserTodos, setUserTodos, user, signOut, login, todos, setTodos, completedTodo, setCompletedTodo}} />} />
      <Route path='/SignIn' element={<SignIn {... { register, login, logout, registerEmail, registerPassword, loginEmail, loginPassword, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword}} />} />
    </Routes>
  );
}

export default App;
