import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PathName } from "./helper/constants/pathNames.ts";
import "./theme/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Screen } from "./pages/index.ts";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index path={PathName.homePath} element={<Screen.Welcome />} />
        <Route path={PathName.loginPath} element={<Screen.Login />} />
        <Route path={PathName.registerPath} element={<Screen.Register/>} />
        <Route path={PathName.registerSuccessPath} element={<Screen.RegisterSuccessFully />} />
        <Route element={<Screen.Navbar />}>
          <Route path={PathName.chatListPath} element={<Screen.ChatList />} />
          <Route path={PathName.documentListPath} element={<Screen.DocumentList />} />
          <Route path={PathName.userListPath} element={<Screen.UserList />} />
          <Route path={PathName.logoutPath} element={<Screen.Logout />} />
          <Route path={PathName.sharedDocumentPath} element={<Screen.SharedDocument />} />
        </Route>
        <Route   path={PathName.notFoundPath} element={<Screen.NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
