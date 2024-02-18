import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  getDataToLocalStorage,
  saveDataToLocalStorage,
} from "../../helper/localStorage/index.ts";
import { localKey } from "../../helper/constants/localStorageKey.ts";
import MyModal from "../../components/Modal/modal/index.jsx";

function SharedDocument() {
  const [fileDetails, setfileDetails] = useState();
  const [sharedUserList, setsharedUserList] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
  const [loggeduser, setloggeduser] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedFile, setselectedFile] = useState();
  let location = useLocation();

  useEffect(() => {
    getFileFromLocation();
    getUserDetails();
    getLoggedUser();
    getSharedFileUser();
  }, []);

  const getFileFromLocation = () => {
    setfileDetails(location.state.file);
  };

  // Function to get SharedFile user
  const getSharedFileUser = () => {
    const sharedUser = getDataToLocalStorage(localKey.SHARED_DOCUMENT);
    setsharedUserList(sharedUser);
  };

  // Function to get All Users
  const getUserDetails = () => {
    const users = getDataToLocalStorage(localKey.USERS);
    setuserDetails(users);
  };

  // Function to get logged in User
  const getLoggedUser = () => {
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setloggeduser(loginUser);
  };

  // Function to get select user for sharing file
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("event.target.value----------->", event.target.value);
  };

  // Function to share file
  const callToShareFile = () => {
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    let prevShareData = getDataToLocalStorage(localKey.SHARED_DOCUMENT);
    let alreadyShared = prevShareData.filter(
      (item) =>
        item.filename === fileDetails.filename &&
        item.reciveEmail === selectedValue &&
        item.senderEmail === loginUser.email
    );
    if (alreadyShared.length > 0) {
      alert("This file already shared!");
      return;
    }
    setSelectedValue("");
    let shareData = {
      senderEmail: loginUser.email,
      label: fileDetails.label,
      filename: fileDetails.filename,
      reciveEmail: selectedValue,
    };
    saveDataToLocalStorage(localKey.SHARED_DOCUMENT, [
      ...prevShareData,
      shareData,
    ]);
    getSharedFileUser();
  };

  // Function remove shared file
  const callToRemoveShareFile = () => {
    let file = { ...selectedFile };
    const shareList = [...sharedUserList];
    const filterList = shareList.filter(
      (item) =>
        file.filename !== item.filename ||
        file.reciveEmail !== item.reciveEmail ||
        file.senderEmail !== item.senderEmail
    );
    saveDataToLocalStorage(localKey.SHARED_DOCUMENT, filterList);
    getSharedFileUser();
  };
  return (
    <div className="w-100 d-flex flex-column">
      <div className="w-75 d-flex flex-column align-self-center mt-3">
        <p className="w-100 ">
          <b>Upload Sharing :</b> {fileDetails?.filename}
        </p>
      </div>

      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div class="card w-75">
          <div class="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              {sharedUserList.length > 0 ? (
                <table class="w-100 table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" className="col-4">
                        Shared User{" "}
                      </th>
                      <th scope="col" className="col-3"></th>
                      <th scope="col" className="col-3"></th>
                      <th scope="col" className="col-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ maxHeight: 250, overflow: "scroll" }}>
                    {sharedUserList.map((item) => {
                      if (item.filename !== fileDetails.filename) return null;
                      return (
                        <tr>
                          <td>{item.reciveEmail}</td>
                          <td></td>
                          <td></td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setselectedFile(item);
                                setOpenDeleteModel(true);
                              }}
                            >
                              <i className="fa fa-trash icon-space" />
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <>
                  <p className="text-center m-4">No Documents Found!</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div class="card w-75">
          <div class="card-body w-100">
            <h6 className="bg-light text-dark p-3 rounded">Add Sharing</h6>
            <div className="w-100 d-flex flex-row col-12 align-items-center mt-4">
              <div className="col-2">
                <b>Chosse User : </b>
              </div>
              <div className="col-3">
                <Form.Select
                  aria-label="Default select example"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="">Select an option</option>
                  {userDetails.map((item) => {
                    if (item.email === loggeduser.email) {
                      return null;
                    }
                    return <option value={item.email}>{item.name}</option>;
                  })}
                </Form.Select>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm col-2"
                style={{ marginLeft: 10, height: 40 }}
                onClick={() => callToShareFile()}
              >
                Add Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---Delete remove file shared  Modal -- */}
      <MyModal
        openModal={openDeleteModel}
        closeModal={() => setOpenDeleteModel(false)}
        title={"Confirm file Remove Access!"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => {
          callToRemoveShareFile();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
      >
        <p className="text-center">Are you sure, you want delete this file?</p>
      </MyModal>
    </div>
  );
}

export default SharedDocument;
