
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserButtons from './UserButtons';


const NavBar = () => {
  let user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <UserButtons user = {user}/>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
