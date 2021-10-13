import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import {addModal} from "../../store/session"
import "../Modal/UserForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleClick = (e) => {
    e.preventDefault()
   dispatch(addModal("signup"))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div id = "modal-inner-container" style = {{height:"350px"}}>
        <h4 id = "signup-title">Log In</h4>
        <div id = "form-outer-container">
          <h2 id = "welcome-title">Welcome to MapYourRun</h2>
    <form id="user-form" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="form-inputs">
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type='submit'>Login</button>
    </form>
    <div id = "change-signin-type" onClick = {handleClick}>Dont have an account, Sign up instead!</div>
    </div>
      </div>
    </>
  );
};

export default LoginForm;
