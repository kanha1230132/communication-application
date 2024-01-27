import React from "react";
import "./style.css";

function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form>
        <div className="row mb-3">
          <label for="inputEmail3" className="col-sm-3 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" />
          </div>
        </div>
        <a href="/loginSuccessfully" className="btn btn-primary align-middle">
          Sign in
        </a>
      </form>
    </div>
  );
}

export default Login;
