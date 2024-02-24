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
    textMessage,
    Outlet,
  } = AllFilesImporter();
  const navigate = useNavigate();
  const [isOpneLogoutModel, setOpenLogoutModel] = useState(false);
  const onLogout = () => {
    removeItemFromLocalStorage(localKey.LOGGED_IN_USER);
    navigate(PathName.homePath);
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
            compare(PathName.chatListPath) ? "active bg-secondary" : "text-dark"
          } `}
          aria-current="page"
          to={PathName.chatListPath}
        >
          {textMessage.GROUP_CHAT}
        </Link>
        <Link
          className={`nav-link ${
            compare(PathName.userListPath) ? "active bg-secondary" : "text-dark"
          }`}
          to={PathName.userListPath}
        >
          {textMessage.MANAGE_USER}
        </Link>
        <Link
          className={`nav-link ${
            compare(PathName.documentListPath) ? "active bg-secondary" : "text-dark"
          }`}
          to={PathName.documentListPath}
        >
          {textMessage.MANAGEMENT_DOCUMENTS}
        </Link>
        <Link
          className={`nav-link ${compare(PathName.loginPath) ? "active" : "text-dark"}`}
          aria-disabled="true"
          onClick={() => setOpenLogoutModel(true)}
        >
          {textMessage.LOGOUT}
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
