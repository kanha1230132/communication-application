import Login from "../pages/login/index.tsx";
import ChatList from "../pages/chatList/index.tsx";
import DocumentList from "../pages/documentList/index.tsx";
import UserList from "../pages/userList/index.tsx";
import RegisterSuccessFully from "../pages/registerSuccessFully/index.tsx";
import Register from "../pages/register/index.tsx";
import Logout from "../pages/logout/index.tsx";
import Welcome from "../pages/welcome/index.tsx";
import SharedDocument from "../pages/shareDocumentList/index.tsx";
import NotFound from "../pages/notFound/index.tsx";
import Navbar from "../navigation/navbar/index.tsx";
interface IScreens {
    RegisterSuccessFully : () => React.JSX.Element,
    Login: () => React.JSX.Element,
    ChatList: () => React.JSX.Element
    DocumentList: () => React.JSX.Element
    UserList: () => React.JSX.Element
    Register: () => React.JSX.Element
    Logout: () => React.JSX.Element
    Welcome: () => React.JSX.Element
    SharedDocument: () => React.JSX.Element
    Navbar: () => React.JSX.Element
    NotFound: () => React.JSX.Element
}

export const Screen:IScreens= {
  Login,
  ChatList,
  DocumentList,
  UserList,
  RegisterSuccessFully,
  Register,
  Logout,
  Welcome,
  SharedDocument,
  Navbar,
  NotFound
};
