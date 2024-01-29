import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";
function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Welcome to Users Module</h1>

      <p>Existing Users</p>

      {/* Login Button */}
        <Link className="outline-button text-center" to={PathName.loginPath}>Login</Link>{" "}
      <br />

      <p>New Users</p>

      {/* Register Button */}
        <Link className="outline-button text-center" to={PathName.registerPath}>Register</Link>{" "}
    </div>
  );
}

export default Welcome;
