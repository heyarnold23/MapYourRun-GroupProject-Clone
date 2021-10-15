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

        <select style = {{borderBottom:0, borderRadius:"10px"}}
          type='text'
          name='height'
          onChange={updateHeight}
          value={height}
        >
          <option value="" selected disabled hidden >Height</option>
          <option value="3'1">3'1"</option>
          <option value="3'2">3'2"</option>
          <option value="3'3">3'3"</option>
          <option value="3'4">3'4"</option>
          <option value="3'5">3'5"</option>
          <option value="3'6">3'6"</option>
          <option value="3'7">3'7"</option>
          <option value="3'8">3'8"</option>
          <option value="3'9">3'9"</option>
          <option value="3'10">3'10"</option>
          <option value="3'11">3'11"</option>
          <option value="4'0">4'0"</option>
          <option value="4'1">4'1"</option>
          <option value="4'2">4'2"</option>
          <option value="4'3">4'3"</option>
          <option value="4'4">4'4"</option>
          <option value="4'5">4'5"</option>
          <option value="4'6">4'6"</option>
          <option value="4'7">4'7"</option>
          <option value="4'8">4'8"</option>
          <option value="4'9">4'9"</option>
          <option value="4'10">4'10"</option>
          <option value="4'11">4'11"</option>
          <option value="5'0">5'0"</option>
          <option value="5'1">5'1"</option>
          <option value="5'2">5'2"</option>
          <option value="5'3">5'3"</option>
          <option value="5'4">5'4"</option>
          <option value="5'5">5'5"</option>
          <option value="5'6">5'6"</option>
          <option value="5'7">5'7"</option>
          <option value="5'8">5'8"</option>
          <option value="5'9">5'9"</option>
          <option value="5'10">5'10"</option>
          <option value="5'11">5'11"</option>
          <option value="6'0">6'0"</option>
          <option value="6'1">6'1"</option>
          <option value="6'2">6'2"</option>
          <option value="6'3">6'3"</option>
          <option value="6'4">6'4"</option>
          <option value="6'5">6'5"</option>
          <option value="6'6">6'6"</option>
          <option value="6'7">6'7"</option>
          <option value="6'8">6'8"</option>
          <option value="6'9">6'9"</option>
          <option value="6'10">6'10"</option>
          <option value="6'11">6'11"</option>
          <option value="7'0">7'0"</option>
          <option value="7'1">7'1"</option>
          <option value="7'2">7'2"</option>
          <option value="7'3">7'3"</option>
          <option value="7'4">7'4"</option>
          <option value="7'5">7'5"</option>
          <option value="7'6">7'6"</option>
          <option value="7'7">7'7"</option>
          <option value="7'8">7'8"</option>
          <option value="7'9">7'9"</option>
          <option value="7'10">7'10"</option>
          <option value="7'11">7'11"</option>
        </select>
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
