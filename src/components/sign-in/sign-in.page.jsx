import React from 'react';
import './sign-in.styles.css'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase';

const SignIn = ({ register, login, logout, registerEmail, registerPassword, loginEmail, loginPassword, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword }) => {



  return (
      <div>
          <div >
            <div className='sign-in'>
              <span>Sign in</span>
              <input type="text" placeholder='Email...' onChange={(e) => setLoginEmail(e.target.value)}></input> 
              <input placeholder='Password...' onChange={(e) => setLoginPassword(e.target.value)}></input>
              <button onClick={login}>Sign in</button>
            </div>
            <div>
              <span>Sing Up</span>
              <input type='text' placeholder='Email...' onChange={(e) => setRegisterEmail(e.target.value)} ></input>
              <input type="text" placeholder='Password...' onChange={(e) => setRegisterPassword(e.target.value)} ></input>
              <button onClick={register}>sign up</button>
            </div>
          </div>
      </div>
  );
};

export default SignIn;

