import React, { useEffect, useState } from "react";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";
import { IUsers } from "../../interface/index.ts";

function UserList() {
  const {
    getDataToLocalStorage,
    saveDataToLocalStorage,
    localKey,
    MyModal,
    FloatingLabel,
    Form,
    Loader,
    successToast,
    dangerToast,
  } = AllFilesImporter();
  const [userList, setUserList] = useState<IUsers[]>();
  const [openDeleteModel, setOpenDeleteModel] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUsers>();
  const [OpenEditModal, setOpenEditModal] = useState<boolean>(false);
  const [EditData, setEditData] = useState<IUsers>({
    id: 1,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserList();
  }, []);

  // Function to fetch user data
  const fetchUserList = () => {
    const data: IUsers[] = getDataToLocalStorage(localKey.USERS);
    setUserList(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Function to delete the user data
  const callToDeleteUser = () => {
    if (selectedUser) {
      let loggedUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
      if (loggedUser.email === selectedUser.email) {
        dangerToast("You can't delete this user");
        return;
      }
      setIsLoading(true);
      let users: IUsers[] = [];
      if (userList) {
        users = [...userList];
      }
      let filterUser = users.filter(
        (item) => item.email !== selectedUser.email
      );
      saveDataToLocalStorage("users", filterUser);
      successToast("Successfully User Deleted.");
      fetchUserList();
    }
  };

  // Function to Edit the user data
  const callToEditUser = () => {
    if (selectedUser) {
      let loggedUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
      if (loggedUser.email === selectedUser.email) {
        dangerToast("You can't Edit this user");
        return;
      }
      setIsLoading(true);
      let users: IUsers[] = [];
      if (userList) {
        users = [...userList];
      }
      let index: number = users.findIndex(
        (item) => item.email === selectedUser.email
      );
      users[index] = EditData;
      saveDataToLocalStorage("users", users);
      successToast("Successfully User Updated.");

      fetchUserList();
    }
  };

  // Function to handle changes in user data
  const onChangeHandle = (e: any) => {
    const { name, value } = e.target;
    setEditData({ ...EditData, [name]: value });
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center mt-3">
      <div className="card w-75">
        <div className="card-body">
          <div className="w-100 d-flex flex-column align-self-center">
            <h3>Users</h3>
            <table className="w-100 table table-striped">
              <thead>
                <tr>
                  <th scope="col" className="col-3">
                    Name{" "}
                  </th>
                  <th scope="col" className="col-7">
                    User EmailId
                  </th>
                  <th scope="col" className="col-2"></th>
                </tr>
              </thead>
              <tbody>
                {userList && userList.length > 0
                  ? userList.map((user) => {
                      return (
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => {
                                setOpenEditModal(true);
                                setSelectedUser(user);
                                setEditData(user);
                              }}
                            >
                              <i className="fa fa-pen icon-space" />
                              Edit
                            </button>
                            <span> | </span>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpenDeleteModel(true);
                              }}
                            >
                              <i className="fa fa-trash icon-space" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <!-- Delete Modal --> */}
      <MyModal
        openModal={openDeleteModel}
        closeModal={() => setOpenDeleteModel(false)}
        title={"Confirm For Deletion!"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={() => {
          callToDeleteUser();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
        customFooter={false}
      >
        <p className="text-center">Are you sure, you want delete this user?</p>
      </MyModal>

      {/* <!-- Edit Modal --> */}
      <MyModal
        openModal={OpenEditModal}
        closeModal={() => setOpenEditModal(false)}
        title={"Edit"}
        closeOnBackdropClick={true}
        isCenter={true}
        onSave={() => {
          callToEditUser();
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
            label="Full Name"
            className="m-2"
          >
            <Form.Control
              type="text"
              placeholder="Full Name"
              name="name"
              value={EditData.name}
              onChange={onChangeHandle}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Email"
            className="m-2"
          >
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={EditData.email}
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

export default UserList;
