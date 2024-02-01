import React, { useState } from 'react'
import { PASSWORD_REGEX } from '../helper/constants/constant.ts';

function RegisterViewModal() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setshowToastMessage] = useState('');

   /** Function to handle form field changes */
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /** Click on Register button to registration */
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validatePassword(formData.password, formData.confirmPassword)){
      setTimeout(() => {
        setShowToast(false);
      }, 700);
      return;
    }
  };

  /** check valid Password 
   * check password and confirm password 
   */
  const validatePassword =(password , confirmPassword)=>{
    if(password != confirmPassword){
      setshowToastMessage("Password not matched!")
      setShowToast(true);
      return false;
    }
    if(!PASSWORD_REGEX.test(password)){
      setshowToastMessage("Missing a special character")
      setShowToast(true);
      return false;
    }
    return true;
  }


  return {
    handleInputChange,
    handleSubmit,
    formData,
    setFormData,
    showToast, setShowToast,
    showToastMessage,

  }
}

export default RegisterViewModal
