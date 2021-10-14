
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserButtons from './UserButtons';
import "./Navigation.css"
import Logo from './public/logo.png'
import { addModal,toggleModalView } from '../../store/session';
const NavBar = () => {
  let user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onClick = (e) => {
      if(user)return
      e.preventDefault()
      dispatch(addModal("login"))
      dispatch(toggleModalView(true))
  }
  return (
    <nav id = "navbar-list-container">
              <NavLink to='/' exact={true} id="logo_link" >
                <img src={Logo} alt="Logo" id="logo"></img>
               </NavLink>
      <ul id = "navbar-list">
        <li>
          <NavLink to='/' exact={true} className = "navbar-li" activeClassName='active'>
            MapYourRun
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard' onClick = {onClick} exact={true} className = "navbar-li" activeClassName='active'>
            Dashboard
          </NavLink></li>
        <li>
          <NavLink to='/social' onClick = {onClick} exact={true} className = "navbar-li" activeClassName='active'>
            Social
          </NavLink></li>
        <li>
          <NavLink to='/new-route' onClick = {onClick} exact={true} className = "navbar-li" activeClassName='active'>
            Create Route
          </NavLink></li>
        <li>
          <NavLink to='/activity' exact={true} className = "navbar-li" activeClassName='active'>
            Activity Feed
          </NavLink></li>
        <li>
          <UserButtons user = {user}/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
