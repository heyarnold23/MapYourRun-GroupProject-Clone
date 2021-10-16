import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <NavLink to = "/"><button onClick={onLogout}>Logout</button></NavLink>
};

export default LogoutButton;
