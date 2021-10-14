import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import {addModal} from "../../store/session"
import "../Modal/UserForm.css"

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
    <div id = "modal-inner-container" >
        <h4 id = "signup-title">Sign Up</h4>
        <div id = "form-outer-container">
          <h2 id = "welcome-title">Welcome to MapYourRun</h2>

      <form id="user-form" onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="form-inputs">
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder="User Name"
        />


        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder="Email"
        />

        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder="Password"
        />

        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Repeat Password"
        />

        <input
          type='number'
          name='age'
          onChange={updateAge}
          value={age}
          placeholder="Age"
        />

        <input
          type='number'
          name='weight'
          onChange={updateWeight}
          value={weight}
          placeholder="Weight"
        />

        <input style = {{borderBottom:0, borderRadius:"10px"}}
          type='text'
          name='height'
          onChange={updateHeight}
          value={height}
          placeholder="Height"
        />
      </div>
      <button type='submit'>Sign Up</button>
    </form>
    <div id = "change-signin-type" onClick = {handleClick}>Already have an account, log in!</div>
    </div>
      </div>
    </>
  );
};

export default SignUpForm;
