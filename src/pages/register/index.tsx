import React, { useState } from "react";
import "./index.css";
import { IUsers } from "../../interface/index.ts";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";

function Register() {
  const {
    localKey,
    saveDataToLocalStorage,
    PathName,
    useNavigate,
    Button,
    FloatingLabel,
    Form,
    Loader,
    Link
  } = AllFilesImporter();
  const [user, setUser] = useState<IUsers>({
    id: 1,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to call User Register
  const onHandleRegister = (e: any) => {
    e.preventDefault();
    if (user.confirmPassword !== user.password) {
      console.log("Password don't match..");
    }
    const localUsers = localStorage.getItem("users");
    if (localUsers == null) {
      setIsLoading(true);
      saveDataToLocalStorage(localKey.USERS, [user]);
      saveDataToLocalStorage(localKey.LOGGED_IN_USER, user);
      callToNavigate();
    } else {
      const users = JSON.parse(localUsers);
      const findUser = users.filter((item) => item.email === user.email);
      console.log("find User === > ", findUser);
      if (findUser.length > 0) {
        console.log("User Already Exists ");
      } else {
        setIsLoading(true);
        const data = [...users, user];
        localStorage.setItem("users", JSON.stringify(data));
        saveDataToLocalStorage(localKey.LOGGED_IN_USER, user);
        callToNavigate();
      }
    }
  };

  // Function to call handle change values
  const onChangeHandle = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Function to navigate register successFully page
  const callToNavigate = () => {
    setTimeout(() => {
      setIsLoading(false);
      navigate(PathName.registerSuccessPath);
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2>Register </h2>

      <form onSubmit={onHandleRegister}>
        <FloatingLabel
          controlId="floatingPassword"
          label="Full Name"
          className="mt-2"
        >
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="name"
            value={user.name}
            onChange={onChangeHandle}
            required
          />
        </FloatingLabel>
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
        <FloatingLabel
          controlId="floatingPassword"
          label="Confirm Password"
          className="mt-2"
        >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onChangeHandle}
            required
          />
        </FloatingLabel>
        <p className="m-2">Already Have an Account ? <Link to={PathName.loginPath}>Sign In</Link> </p>
        <Button type="submit" variant="secondary" className="w-100 mt-2">
          Register
        </Button>
      </form>
      <Loader isLoading={isLoading} />
    </div>
  );
}


export default Register;
