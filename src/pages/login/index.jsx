import React, { useState } from "react";
import "./style.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import {
  getDataToLocalStorage,
  saveDataToLocalStorage,
} from "../../helper/localStorage/index.ts";
import { localKey } from "../../helper/constants/localStorageKey.ts";
import { useNavigate } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Function to call handle change values
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to call login user
  const onHandleSignIn = (e) => {
    e.preventDefault();
    const users = getDataToLocalStorage(localKey.USERS);
    if (users.length > 0) {
      const loggedUser = users.filter((item) => item.email === user.email);
      if (loggedUser.length > 0) {
        if (loggedUser[0].password === user.password) {
          saveDataToLocalStorage(localKey.LOGGED_IN_USER, loggedUser[0]);
          setTimeout(() => {
          navigate(PathName.chatListPath);
          },1000);
        } else {
          alert("Password not matched!");
        }
      } else {
        alert("Users Not Exists !");
      }
    } else {
      alert("Users Not Exists !");
    }
  };

  return (
    <div className="login-container">
      <p className="p-title">Login</p>
      <form onSubmit={onHandleSignIn}>
        <FloatingLabel
          controlId="floatingPassword"
          label="Email"
          className="mt-2"
        >
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChangeHandle}
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mt-2"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChangeHandle}
            required
          />
        </FloatingLabel>
        <Button type="submit" variant="secondary" className="w-100 mt-2">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default Login;
