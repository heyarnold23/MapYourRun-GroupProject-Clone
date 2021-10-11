import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import {addModal} from "../../store/session"
import "./UserForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, age, weight, height));
      if (data) {
        setErrors(data)
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault()
   dispatch(addModal("login"))
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAge = (e) => {
    setAge(e.target.value);
  };

  const updateWeight = (e) => {
    setWeight(e.target.value);
  };

  const updateHeight = (e) => {
    setHeight(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Age</label>
        <input
          type='number'
          name='age'
          onChange={updateAge}
          value={age}
        ></input>
      </div>
      <div>
        <label>Weight</label>
        <input
          type='number'
          name='weight'
          onChange={updateWeight}
          value={weight}
        ></input>
      </div>
      <div>
        <label>Height</label>
        <input
          type='text'
          name='height'
          onChange={updateHeight}
          value={height}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
    <div id = "change-signin-type" onClick = {handleClick}>Already have an account, log in!</div>
    </>
  );
};

export default SignUpForm;
