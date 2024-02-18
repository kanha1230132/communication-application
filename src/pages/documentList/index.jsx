import React, { useEffect, useState } from "react";
import MyModal from "../../components/Modal/modal";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  getDataToLocalStorage,
  saveDataToLocalStorage,
} from "../../helper/localStorage/index.ts";
import { localKey } from "../../helper/constants/localStorageKey.ts";
import { useNavigate } from "react-router-dom";
import { PathName } from "../../helper/constants/pathNames.ts";

function DocumentList() {
  const [documentList, setDocumentList] = useState([]);
  const [sharedDocumentList, setsharedDocumentList] = useState([]);
  const [uploadDocumentModal, setuploadDocumentModal] = useState(false);
  const [userUploadFile, setuserUploadFile] = useState({
    id: 1,
    filename: "",
    label: "",
    uploadBy: "",
  });
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedFile, setselectedFile] = useState();
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUploadFiles();
    fetchSharedDocument();
  }, []);

  // Function to fetch Upload files
  const fetchUploadFiles = () => {
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    const uploadFiles = getDataToLocalStorage(localKey.UPLOADS);
    const filterUploadFiles = uploadFiles.filter(
      (item) => loginUser.email === item.uploadBy
    );
    setDocumentList(filterUploadFiles);
  };

  // Function to fetch Shared Upload files
  const fetchSharedDocument = () => {
    const sharedDocuments = getDataToLocalStorage(localKey.SHARED_DOCUMENT);
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    console.log("loginUser------->", loginUser);
    let filterDoc = sharedDocuments.filter(
      (item) => item.reciveEmail === loginUser.email
    );
    setsharedDocumentList(filterDoc);
  };

  // Function to handle changes of upload files
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setuserUploadFile({ ...userUploadFile, [name]: value });
  };

  // Function to Upload files
  const callToUploadUserFile = () => {
    setuploadDocumentModal(false);
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    let fileUploads = { ...userUploadFile };
    fileUploads.uploadBy = loginUser.email;
    const localuploads = getDataToLocalStorage(localKey.UPLOADS);
    if (localuploads == null) {
      saveDataToLocalStorage(localKey.UPLOADS, [fileUploads]);
    } else {
      saveDataToLocalStorage(localKey.UPLOADS, [...localuploads, fileUploads]);
    }
    fetchUploadFiles();
    setuserUploadFile({
      id: 1,
      filename: "",
      label: "",
    });
  };

  // Function to delete files
  const callToDeleteFile = () => {
    const document = [...documentList];
    let filterFiles = document.filter(
      (item) => item.filename !== selectedFile.filename
    );
    saveDataToLocalStorage(localKey.UPLOADS, filterFiles);
    fetchUploadFiles();
  };

  // Function to edit files
  const callToEditFile = () => {
    let documents = [...documentList];
    let index = documents.findIndex(
      (item) => item.filename === userUploadFile.filename
    );
    documents[index] = userUploadFile;
    saveDataToLocalStorage(localKey.UPLOADS, documents);
    fetchUploadFiles();
  };

  return (
    <div className="w-100 d-flex flex-column align-self-center">
      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div class="card w-75">
          <div class="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>My Uploads</h3>
              {documentList.length > 0 ? (
                <table class="w-100 table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" className="col-3">
                        Label{" "}
                      </th>
                      <th scope="col" className="col-6">
                        File Name
                      </th>
                      <th scope="col" className="col-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ maxHeight: 250, overflow: "scroll" }}>
                    {documentList.map((item) => {
                      return (
                        <tr>
                          <td>{item.label}</td>
                          <td>{item.filename}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                setOpenEditModal(true);
                                setuserUploadFile(item);
                              }}
                            >
                              <i className="fa fa-pen icon-space" />
                              Edit
                            </button>
                            <span> | </span>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setselectedFile(item);
                                setOpenDeleteModel(true);
                              }}
                            >
                              <i className="fa fa-trash icon-space" />
                              Delete
                            </button>
                            <span> | </span>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                navigate(PathName.sharedDocumentPath, {
                                  state: { file: item },
                                });
                              }}
                            >
                              <i className="fa fa-share icon-space" />
                              Share
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
          <div class="card-body">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>Shared Uploads</h3>
              {sharedDocumentList.length > 0 ? (
                <table class="w-100 table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" className="col-3">
                        Label{" "}
                      </th>
                      <th scope="col" className="col-6">
                        File Name
                      </th>
                      <th scope="col" className="col-3">
                        Shared By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharedDocumentList.map((item) => {
                      return (
                        <tr>
                          <td>{item.label}</td>
                          <td>{item.filename}</td>
                          <td>{item.senderEmail}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <>
                  <p className="text-center m-4">No Shared Documents Found!</p>
                </>
              )}
            </div>

            <div className="w-25 d-flex flex-column align-self-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setuploadDocumentModal(true);
                }}
              >
                + Add Uploads
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -- Upload Document Modal -- */}
      <MyModal
        openModal={uploadDocumentModal}
        title={"Upload"}
        isCenter={true}
        saveButtonTitle={"Upload Now"}
        onSave={() => callToUploadUserFile()}
        closeModal={() => setuploadDocumentModal(false)}
      >
        <form>
          <FloatingLabel
            controlId="floatingPassword"
            label="File Description"
            className="m-2"
          >
            <Form.Control
              type="text"
              placeholder="File Description"
              name="label"
              value={userUploadFile.label}
              onChange={onChangeHandle}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="File Upload"
            className="m-2"
          >
            <Form.Control
              type="file"
              placeholder="File Upload"
              name="filename"
              value={userUploadFile.filename}
              onChange={onChangeHandle}
              required
            />
          </FloatingLabel>
        </form>
      </MyModal>

      {/* ---Delete Upload Document -- */}
      <MyModal
        openModal={openDeleteModel}
        closeModal={() => setOpenDeleteModel(false)}
        title={"Confirm file Deletion!"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => {
          // CallToDeleteUserByAdmin();
          callToDeleteFile();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
      >
        <p className="text-center">Are you sure, you want delete this file?</p>
      </MyModal>

      {/* <!-- Edit Modal --> */}
      <MyModal
        openModal={OpenEditModal}
        closeModal={() => setOpenEditModal(false)}
        title={"Edit"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={(e) => {
          callToEditFile();
          setOpenEditModal(false);
        }}
        isLoading={false}
        saveButtonTitle={"Edit"}
        cancelButtonTitle={"Cancel"}
      >
        <form>
          <FloatingLabel
            controlId="floatingPassword"
            label="File Description"
            className="m-2"
          >
            <Form.Control
              type="text"
              placeholder="File Description"
              name="label"
              value={userUploadFile.label}
              onChange={onChangeHandle}
              required
            />
          </FloatingLabel>
        </form>
      </MyModal>
    </div>
  );
}

export default DocumentList;
