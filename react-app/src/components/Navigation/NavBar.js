
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserButtons from './UserButtons';
import "./Navigation.css"

const NavBar = () => {
  let user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul id = "navbar-list">
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            MapYourRun
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard' exact={true} activeClassName='active'>
            Dashboard
          </NavLink></li>
        <li>
          <NavLink to='/social' exact={true} activeClassName='active'>
            Social
          </NavLink></li>
        <li>
          <NavLink to='/new-route' exact={true} activeClassName='active'>
            Create Route
          </NavLink></li>
        <li>
          <NavLink to='/activity' exact={true} activeClassName='active'>
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
