import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/login";
import ChatList from "./pages/chatList";
import DocumentList from "./pages/documentList";
import UserList from "./pages/userList";
import RegisterSuccessFully from "./pages/registerSuccessFully";
import Register from "./pages/register";
import Logout from "./pages/logout";
import LoginSuccessFully from "./pages/loginSuccessFully";
import EditList from "./pages/editUser";
import Welcome from "./pages/welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Navbar from "./navigation/navbar";
import { Path } from "./helper/constants/pathNames";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={Path.homePath} element={<Welcome />} />
        <Route path={Path.loginPath} element={<Login />} />
        <Route path={Path.registerPath} element={<Register />} />
        <Route
          path={Path.registerSuccessPath}
          element={<RegisterSuccessFully />}
        />
        <Route path={Path.loginSuccessPath} element={<LoginSuccessFully />} />
        <Route path={Path.notFoundPath} element={<NotFound />} />
        <Route element={<Navbar />}>
          <Route path={Path.chatListPath} element={<ChatList />} />
          <Route path={Path.documentListPath} element={<DocumentList />} />
          <Route path={Path.userListPath} element={<UserList />} />
          <Route path={Path.logoutPath} element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
