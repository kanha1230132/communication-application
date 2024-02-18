import MyModal from "../../components/Modal/modal/index.jsx";
import { localKey } from "../../helper/constants/localStorageKey.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import {
  saveDataToLocalStorage,
  getDataToLocalStorage,
  removeItemFromLocalStorage
} from "../../helper/localStorage/index.ts";
import { FloatingLabel, Form, Button} from "react-bootstrap";
import { useNavigate ,Link, Outlet} from "react-router-dom";
import Loader from '../../components/Modal/Loader/index.tsx'
import { useLocation } from "react-router-dom";
import { imageUrl } from "../../assets/index.ts";
import { TextMessage } from "../../helper/constants/textMessage.ts";

const AllFilesImporter = () => {
  
  return {
    saveDataToLocalStorage,
    getDataToLocalStorage,
    removeItemFromLocalStorage,
    PathName,
    localKey,
    MyModal,
    FloatingLabel,
    Form,
    Button,
    useNavigate,
    Link,
    Loader,
    useLocation,
    imageUrl,
    Outlet,
    TextMessage
  };
};

export default AllFilesImporter;
