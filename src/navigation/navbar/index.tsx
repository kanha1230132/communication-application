import React, { useState } from "react";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";

function Navbar() {
  const {
    MyModal,
    removeItemFromLocalStorage,
    localKey,
    PathName,
    useNavigate,
    Link,
    TextMessage,
    Outlet,
  } = AllFilesImporter();
  const navigate = useNavigate();
  const [isOpneLogoutModel, setOpenLogoutModel] = useState(false);
  const onLogout = () => {
    removeItemFromLocalStorage(localKey.LOGGED_IN_USER);
    navigate("/");
  };
  const currentPath = window.location.pathname;
  const compare = (path) => {
    return currentPath.split("/")?.[1] === path.split("/")?.[1];
  };
  return (
    <>
      <nav className="nav nav-pills nav-justified bg-light">
        <Link
          className={`nav-link ${
            compare(PathName.chatListPath) ? "active" : ""
          } `}
          aria-current="page"
          to={PathName.chatListPath}
        >
          {TextMessage.GROUP_CHAT}
        </Link>
        <Link
          className={`nav-link ${
            compare(PathName.userListPath) ? "active" : ""
          }`}
          to={PathName.userListPath}
        >
          {TextMessage.MANAGE_USER}
        </Link>
        <Link
          className={`nav-link ${
            compare(PathName.documentListPath) ? "active" : ""
          }`}
          to={PathName.documentListPath}
        >
          {TextMessage.MANAGEMENT_DOCUMENTS}
        </Link>
        <Link
          className={`nav-link ${compare(PathName.loginPath) ? "active" : ""}`}
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >
          {TextMessage.LOGOUT}
        </Link>
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
          customFooter={false}
          isLoading={false}
        >
          <p>Are you sure, you want to logout!</p>
        </MyModal>
      </nav>

      {/* All outlets */}
      <Outlet />
    </>
  );
}

export default Navbar;
