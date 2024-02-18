import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { TextMessage } from "../../helper/constants/textMessage.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import MyModal from "../../components/Modal/modal/index.jsx";
import { removeItemFromLocalStorage } from "../../helper/localStorage/index.ts";
import { localKey } from "../../helper/constants/localStorageKey.ts";

function Navbar() {
  const navigate = useNavigate();
  const [isOpneLogoutModel, setOpenLogoutModel] = useState(false);
  const onLogout = ()=>{
    removeItemFromLocalStorage(localKey.LOGGED_IN_USER);
    navigate('/')
  }
  return (
    <>
      <nav className="nav nav-pills nav-justified bg-light">
        <Link className="nav-link" aria-current="page" to={PathName.chatListPath}>{TextMessage.GROUP_CHAT}</Link>
        <Link className="nav-link" to={PathName.userListPath}>{TextMessage.MANAGE_USER}</Link>
        <Link className="nav-link" to={PathName.documentListPath}>{TextMessage.MANAGEMENT_DOCUMENTS}</Link>
        <Link
          className="nav-link"
          tabindex="-1"
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >{TextMessage.LOGOUT}</Link>
        <MyModal
          openModal={isOpneLogoutModel}
          closeModal={() => setOpenLogoutModel(false)}
          title={"Logout confirmation"}
          closeOnBackdropClick={true}
          isCenter={true}
          onSave={onLogout}
          saveButtonTitle={"Logout"}
          cancelButtonTitle={"Cancel"}
          type="danger"
        >
          <p >Are you sure, you want to logout!</p>
        </MyModal>
      </nav>
      
      {/* All outlets */}
      <Outlet />
    </>
  );
}

export default Navbar;
