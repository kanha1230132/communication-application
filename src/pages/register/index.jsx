import React, { useState } from "react";
import "./index.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";
import { saveDataToLocalStorage } from "../../helper/localStorage/index.ts";
import { localKey } from "../../helper/constants/localStorageKey.ts";

function Register() {
  const [user, setUser] = useState({
    id: 1,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const onHandleRegister = (e) => {
    e.preventDefault();
    if(user.confirmPassword !== user.password){
      console.log("Password don't match..")
    }
    const localUsers = localStorage.getItem("users");
    if(localUsers == null){
      saveDataToLocalStorage(localKey.USERS, [user]);
      saveDataToLocalStorage(localKey.LOGGED_IN_USER,user);
      callToNavigate();
    }else{
      const users = JSON.parse(localUsers);
      const findUser = users.filter((item)=> item.email === user.email);
      console.log("find User === > ", findUser);
      if(findUser.length >0){
        console.log("User Already Exists ");
      }else{
        const data = [...users,user];
        localStorage.setItem("users", JSON.stringify(data));
        console.log("User add Successfully. ");
        saveDataToLocalStorage(localKey.LOGGED_IN_USER,user);
        callToNavigate();
      }
    }
  };
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const callToNavigate = ()=>{
    navigate(PathName.registerSuccessPath)
  }

  return (
    <div class="login-container">
      <h2>Register </h2>

      <form onSubmit={onHandleRegister}>
      <FloatingLabel controlId="floatingPassword" label="Full Name" className="m-2">
        <Form.Control type="text" placeholder="Full Name" name="name" value={user.name}onChange={onChangeHandle} required/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Email" className="m-2">
        <Form.Control type="email" placeholder="Email" name="email" value={user.email} onChange={onChangeHandle} required/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="m-2">
        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeHandle} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="m-2"> 
        <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandle} required/>
      </FloatingLabel>
      <Button type="submit" variant="secondary" className="m-2">Register</Button>
      </form>
    </div>
  );
}

export default Register;
