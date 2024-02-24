import MyModal from "../../components/Modal/modal/index.jsx";
import { localKey } from "../../helper/constants/localStorageKey.ts";
import { PathName } from "../../helper/constants/pathNames.ts";
import {
  saveDataToLocalStorage,
  getDataToLocalStorage,
  removeItemFromLocalStorage,
} from "../../helper/localStorage/index.ts";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Loader from "../../components/Modal/Loader/index.tsx";
import { useLocation } from "react-router-dom";
import { imageUrl } from "../../assets/index.ts";
import { textMessage } from "../../helper/constants/textMessage.ts";
import {
  infoToast,
  dangerToast,
  successToast,
  warningToast,
} from "../../components/customToast/index.ts";

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
    textMessage,
    infoToast,
    dangerToast,
    successToast,
    warningToast,
  };
};

export default AllFilesImporter;
