import React, { useEffect, useState } from "react";
import MyModal from "../../components/Modal/modal/index.jsx";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";
import { IShareDocuments, IUploads, IUsers } from "../../interface/index.ts";

function SharedDocument() {
  const {
    saveDataToLocalStorage,
    getDataToLocalStorage,
    localKey,
    Form,
    useLocation,
    Loader,
    successToast,
    warningToast
  } = AllFilesImporter();
  const [fileDetails, setFileDetails] = useState<IUploads>();
  const [sharedUserList, setSharedUserList] = useState<IShareDocuments[]>();
  const [userDetails, setUserDetails] = useState<IUsers[]>();
  const [loggeduser, setLoggedUser] = useState<IUsers>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<IShareDocuments>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getFileFromLocation();
    getUserDetails();
    getLoggedUser();
    getSharedFileUser();
  }, []);

  // Function to get file from documents list component
  const getFileFromLocation = () => {
    setFileDetails(location.state.file);
  };

  // Function to get SharedFile user
  const getSharedFileUser = () => {
    const sharedUser:IShareDocuments[] = getDataToLocalStorage(localKey.SHARED_DOCUMENT);
    setSharedUserList(sharedUser);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Function to get All Users
  const getUserDetails = () => {
    const users:IUsers[] = getDataToLocalStorage(localKey.USERS);
    setUserDetails(users);
  };

  // Function to get logged in User
  const getLoggedUser = () => {
    const loginUser:IUsers = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    setLoggedUser(loginUser);
  };

  // Function to get select user for sharing file
  const handleSelectChange = (e:any) => {
    setSelectedValue(e.target.value);
  };

  // Function to share file
  const callToShareFile = () => {
    if(selectedValue=== ""){
      warningToast("Please select user to share file");
      return;
    }
    const loginUser:IUsers = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    let prevShareData:IShareDocuments[] = getDataToLocalStorage(localKey.SHARED_DOCUMENT);
    if(fileDetails){
      let alreadyShared = prevShareData.filter(
        (item) =>
          item.filename === fileDetails.filename &&
          item.reciveEmail === selectedValue &&
          item.senderEmail === loginUser.email
      );
      if (alreadyShared.length > 0) {
        warningToast("This file already shared!");
        return;
      }
      setIsLoading(true);
      setSelectedValue("");
      let shareData = {
        senderEmail: loginUser.email,
        label: fileDetails.label,
        filename: fileDetails.filename,
        reciveEmail: selectedValue,
      };
      successToast("File shared.");
      saveDataToLocalStorage(localKey.SHARED_DOCUMENT, [
        ...prevShareData,
        shareData,
      ]);
      getSharedFileUser();
    }
  };

  // Function remove shared file
  const callToRemoveShareFile = () => {
    if(selectedFile && sharedUserList){
      setIsLoading(true);
      let file = { ...selectedFile };
      const shareList = [...sharedUserList];
      const filterList = shareList.filter(
        (item) =>
          file.filename !== item.filename ||
          file.reciveEmail !== item.reciveEmail ||
          file.senderEmail !== item.senderEmail
      );
      saveDataToLocalStorage(localKey.SHARED_DOCUMENT, filterList);
      successToast("File removed.");
      getSharedFileUser();
    }
    
  };
  return (
    <div className="w-100 d-flex flex-column">
      <div className="w-75 d-flex flex-column align-self-center mt-3">
        <p className="w-100 ">
          <b>Upload Sharing :</b> {fileDetails?.filename}
        </p>
      </div>

      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div className="card w-75">
          <div className="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              {fileDetails && sharedUserList && sharedUserList.length > 0 ? (
                <table className="w-100 table table-striped">
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
                                setSelectedFile(item);
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
        <div className="card w-75">
          <div className="card-body w-100">
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
                  {loggeduser && userDetails && userDetails.map((item) => {
                    if (item.email === loggeduser.email) {
                      return null;
                    }
                    return <option value={item.email}>{item.name}</option>;
                  })}
                </Form.Select>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-sm col-2"
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
        onSave={() => {
          callToRemoveShareFile();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
        customFooter={false}
      >
        <p className="text-center">Are you sure, you want delete this file?</p>
      </MyModal>

      <Loader isLoading={isLoading} />
    </div>
  );
}

export default SharedDocument;
