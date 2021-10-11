import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector} from 'react-redux';
import {addModal,toggleModalView} from "../../store/session"
import LogoutButton from "../auth/LogoutButton"
import FormModal from "../Modal"

function UserButtons({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const modalView = useSelector(state=>state.session.modalView)
  const modalRequired = useSelector(state=>state.session.modalRequired)

  if(!user){
    return (
      <>
        <button id = "profile-button" onClick={openMenu}>
          <div id = "hamburger-icon">
            ☰
          </div>
          <div id = "profile-image">
            👤
          </div>
        </button>
        {showMenu && (
          <div id = "profile-dropdown-outer" style = {{height:"80px"}}>
          <div className="profile-dropdown">
            <div id = "login-div" >
              <button onClick = {()=>{
                dispatch(toggleModalView(true))
                dispatch(addModal("login"))
              }}>Log In</button>
            </div>
            <div style ={{paddingTop:"5px",}}>
              <button onClick = {()=>{
                dispatch(toggleModalView(true))
                dispatch(addModal("signup"))
              }}>Sign Up</button>
            </div>
          </div>
          </div>
        )}
        { modalView ? (<FormModal/>):null}
      </>
    );
  }
  else {
    return (
      <>
        <button id = "profile-button" onClick={openMenu}>
          <div id = "hamburger-icon">
            ☰
          </div>
          <img id = "profile-image" src = {user && user.image}></img>
        </button>
        {showMenu && (
          <div id = "profile-dropdown-outer" style = {{height:"35px"}}>
          <div className="profile-dropdown">
            <div>
              <LogoutButton/>
            </div>
          </div>
          </div>
        )}
      </>
    )
  }

}

export default UserButtons;
