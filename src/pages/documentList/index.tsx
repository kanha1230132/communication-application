import React, { useEffect, useState } from "react";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";
import { IShareDocuments, IUploads, IUsers } from "../../interface/index.ts";

function DocumentList() {
  const {
    PathName,
    localKey,
    saveDataToLocalStorage,
    getDataToLocalStorage,
    useNavigate,
    FloatingLabel,
    Form,
    MyModal,
    Loader,
    successToast,
  } = AllFilesImporter();
  const [documentList, setDocumentList] = useState<IUploads[]>();
  const [sharedDocumentList, setSharedDocumentList] =
    useState<IShareDocuments[]>();
  const [uploadDocumentModal, setUploadDocumentModal] =
    useState<boolean>(false);
  const [userUploadFile, setUserUploadFile] = useState<IUploads>({
    id: 1,
    filename: "",
    label: "",
    uploadBy: "",
  });
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<IUploads>();
  const [OpenEditModal, setOpenEditModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUploadFiles();
    fetchSharedDocument();
  }, []);

  // Function to fetch Upload files
  const fetchUploadFiles = () => {
    const loginUser: IUsers = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    const uploadFiles: IUploads[] = getDataToLocalStorage(localKey.UPLOADS);
    const filterUploadFiles = uploadFiles.filter(
      (item) => loginUser.email === item.uploadBy
    );
    setDocumentList(filterUploadFiles);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Function to fetch Shared Upload files
  const fetchSharedDocument = () => {
    const sharedDocuments: IShareDocuments[] = getDataToLocalStorage(
      localKey.SHARED_DOCUMENT
    );
    const loginUser: IUsers = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    let filterDoc = sharedDocuments.filter(
      (item) => item.reciveEmail === loginUser.email
    );
    setSharedDocumentList(filterDoc);
    
  };

  // Function to handle changes of upload files
  const onChangeHandle = (e: any) => {
    const { name, value } = e.target;
    setUserUploadFile({ ...userUploadFile, [name]: value });
  };

  // Function to Upload files
  const callToUploadUserFile = () => {
    setUploadDocumentModal(false);
    setIsLoading(true);
    const loginUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    let fileUploads = { ...userUploadFile };
    fileUploads.uploadBy = loginUser.email;
    const localuploads = getDataToLocalStorage(localKey.UPLOADS);
    if (localuploads == null) {
      saveDataToLocalStorage(localKey.UPLOADS, [fileUploads]);
    } else {
      saveDataToLocalStorage(localKey.UPLOADS, [...localuploads, fileUploads]);
    }
    successToast("Successfully file Uploaded.")
    fetchUploadFiles();
    setUserUploadFile({
      id: 1,
      filename: "",
      label: "",
      uploadBy: "",
    });
  };

  // Function to delete files
  const callToDeleteFile = () => {
    if (selectedFile && documentList) {
      const document = [...documentList];
      let filterFiles = document.filter(
        (item) => item.filename !== selectedFile.filename
      );
      saveDataToLocalStorage(localKey.UPLOADS, filterFiles);
      fetchUploadFiles();
    }
  };

  // Function to edit files
  const callToEditFile = () => {
    if (documentList) {
      let documents = [...documentList];
      let index = documents.findIndex(
        (item) => item.filename === userUploadFile.filename
      );
      documents[index] = userUploadFile;
      saveDataToLocalStorage(localKey.UPLOADS, documents);
      fetchUploadFiles();
    }
  };

  return (
    <div className="w-100 d-flex flex-column align-self-center">
      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div className="card w-75">
          <div className="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>My Uploads</h3>
              {documentList && documentList.length > 0 ? (
                <table className="w-100 table table-striped">
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
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => {
                                setOpenEditModal(true);
                                setUserUploadFile(item);
                              }}
                            >
                              <i className="fa fa-pen icon-space" />
                              Edit
                            </button>
                            <span> | </span>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setSelectedFile(item);
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
        <div className="card w-75">
          <div className="card-body">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>Shared Uploads</h3>
              {sharedDocumentList && sharedDocumentList.length > 0 ? (
                <table className="w-100 table table-striped">
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
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setUploadDocumentModal(true);
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
        closeModal={() => setUploadDocumentModal(false)}
        closeOnBackdropClick={undefined}
        customFooter={false}
        isLoading={undefined}
        cancelButtonTitle={undefined}
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
        onSave={() => {
          // CallToDeleteUserByAdmin();
          callToDeleteFile();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
        customFooter={false}
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
        onSave={() => {
          callToEditFile();
          setOpenEditModal(false);
        }}
        isLoading={false}
        saveButtonTitle={"Edit"}
        cancelButtonTitle={"Cancel"}
        customFooter={false}
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

      <Loader isLoading={isLoading} />

    </div>
  );
}

export default DocumentList;
