import React from "react";
import "./index.css";
import { PathName } from "../../helper/constants/pathNames.ts";

function Register() {
  return (
    <div class="login-container">
      <h1>Register </h1>

      <form>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-10 col-form-label">
            Full Name
          </label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-10 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-10 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-10 col-form-label">
            Confirm Password
          </label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" />
          </div>
        </div>
        <a href={PathName.registerSuccessPath} class="btn btn-primary align-middle">
          Register
        </a>
      </form>
    </div>
  );
}

export default Register;
