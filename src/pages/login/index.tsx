import React, { useState } from "react";
import "./style.css";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";
import { IUsers } from "../../interface/index.ts";
const Login = () => {
  // Custom hooks for All files importers
  const {
    PathName,
    localKey,
    getDataToLocalStorage,
    saveDataToLocalStorage,
    useNavigate,
    FloatingLabel,
    Form,
    Button,
    Link,
    Loader,
    warningToast,
    dangerToast,
    successToast
  } = AllFilesImporter();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to call handle change values
  const onChangeHandle = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to call login user
  const onHandleSignIn = (e: any) => {
    e.preventDefault();
    const users: IUsers[] = getDataToLocalStorage(localKey.USERS);
    if (users.length > 0) {
      const loggedUser = users.filter((item) => item.email === user.email);
      if (loggedUser.length > 0) {
        if (loggedUser[0].password === user.password) {
          setIsLoading(true);
          saveDataToLocalStorage(localKey.LOGGED_IN_USER, loggedUser[0]);
          navigateToHome();
        } else {
          warningToast("Password not matched!")
        }
      } else {
        dangerToast("Users Not Exists !");
      }
    } else {
      dangerToast("Users Not Exists !");
    }
  };

  // Function to navigate home page
  const navigateToHome = () =>{
    setTimeout(() => {
      successToast("Login Successfully!");
      setIsLoading(false);
      navigate(PathName.chatListPath);
    }, 1000);
  }

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
        <p className="m-2">Don't Have an Account ? <Link to={PathName.registerPath}>Register</Link> </p>
        <Button type="submit" variant="secondary" className="w-100 mt-2">
          Sign In
        </Button>
      </form>

      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Login;
