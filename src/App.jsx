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
import { PathName } from "./helper/constants/pathNames.ts";
import './theme/style.css'
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
        <Route path={PathName.loginSuccessPath} element={<LoginSuccessFully />} />
        <Route path={PathName.notFoundPath} element={<NotFound />} />
        <Route element={<Navbar />}>
          <Route path={PathName.chatListPath} element={<ChatList />} />
          <Route path={PathName.documentListPath} element={<DocumentList />} />
          <Route path={PathName.userListPath} element={<UserList />} />
          <Route path={PathName.logoutPath} element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
