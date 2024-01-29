import React from "react";
import { Link, Outlet } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";

function Navbar() {
  return (
    <>
      <nav className="nav nav-pills nav-justified bg-light">
        <Link className="nav-link" aria-current="page" to={PathName.chatListPath}>{TextMessage.GROUP_CHAT}</Link>
        <Link className="nav-link" to={PathName.userListPath}>{TextMessage.MANAGE_USER}</Link>
        <Link className="nav-link" to={PathName.documentListPath}>{TextMessage.MANAGEMENT_DOCUMENTS}</Link>
        <Link
          className="nav-link"
          to={PathName.logoutPath}
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
