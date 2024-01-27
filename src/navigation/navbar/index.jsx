import React from "react";
import { Link, Outlet } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage";

function Navbar() {
  return (
    <>
      <nav className="nav nav-pills nav-justified">
        <Link className="nav-link" aria-current="page" to="/chatlist">{TextMessage.GROUP_CHAT}</Link>
        <Link className="nav-link" to="/userlist">{TextMessage.MANAGE_USER}</Link>
        <Link className="nav-link" to="/documentlist">{TextMessage.MANAGEMENT_DOCUMENTS}</Link>
        <Link
          className="nav-link"
          to="/logout"
          tabindex="-1"
          aria-disabled="true"
        >{TextMessage.LOGOUT}</Link>
      </nav>
      
      {/* All outlets */}
      <Outlet />
    </>
  );
}

export default Navbar;
