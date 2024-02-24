import React from "react";
import { Link } from "react-router-dom";
import { textMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link className="nav-link text-success pb-2" to={PathName.loginPath}>
          {textMessage.GOTOLOGIN}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
