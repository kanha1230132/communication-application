import React from "react";
import Login from "./pages/login/index.tsx";
import ChatList from "./pages/chatList/index.tsx";
import DocumentList from "./pages/documentList/index.tsx";
import UserList from "./pages/userList/index.tsx";
import RegisterSuccessFully from "./pages/registerSuccessFully/index.tsx";
import Register from "./pages/register/index.tsx";
import Logout from "./pages/logout/index.tsx";
// import LoginSuccessFully from "./pages/loginSuccessFully/index.tsx.jsx";
import Welcome from "./pages/welcome/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound/index.tsx";
import Navbar from "./navigation/navbar/index.tsx";
import { PathName } from "./helper/constants/pathNames.ts";
import './theme/style.css'
import SharedDocument from "./pages/shareDocumentList/index.tsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={PathName.homePath} element={<Welcome />} />
        <Route path={PathName.loginPath} element={<Login />} />
        <Route path={PathName.registerPath} element={<Register />} />
        <Route
          path={PathName.registerSuccessPath}
          element={<RegisterSuccessFully />}
        />
        {/* <Route path={PathName.loginSuccessPath} element={<LoginSuccessFully />} /> */}
        <Route path={PathName.notFoundPath} element={<NotFound />} />
        <Route element={<Navbar />}>
          <Route path={PathName.chatListPath} element={<ChatList />} />
          <Route path={PathName.documentListPath} element={<DocumentList />} />
          <Route path={PathName.userListPath} element={<UserList />} />
          <Route path={PathName.logoutPath} element={<Logout />} />
          <Route path={PathName.sharedDocumentPath} element={<SharedDocument />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
