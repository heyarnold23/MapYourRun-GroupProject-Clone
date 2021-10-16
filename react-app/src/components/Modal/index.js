import React from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignupForm from "../auth/SignUpForm"
import {toggleModalView} from "../../store/session"
import {useDispatch,useSelector} from "react-redux"
import LoadSpinner from "../LoadSpinner/LoadSpinner"
import "./UserForm.css"
function FormModal() {
  const dispatch = useDispatch()
  const modalType= useSelector((state)=>state.session.modalType)
  const modalView = useSelector(state => state.session.modalView)
  let userForm

  if(modalView && modalType==="login"){
    userForm = (<LoginForm/>)
  }
  else if (modalView && modalType === "signup"){
    userForm = (<SignupForm/>)
  }
  else if (modalView && modalType === "loading"){
    userForm = (<LoadSpinner/>)
  }

  

  return (
    <>
      {modalView && (
        <Modal onClose={() => dispatch(toggleModalView(false))}>
          {userForm}
        </Modal>
      )}
    </>
  );
}

export default FormModal;
