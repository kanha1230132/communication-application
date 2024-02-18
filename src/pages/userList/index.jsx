import React, { useEffect, useState } from "react";
import MyModal from "../../components/Modal/modal";
import { getDataToLocalStorage, saveDataToLocalStorage } from "../../helper/localStorage/index.ts";
import { FloatingLabel, Form } from "react-bootstrap";
import { localKey } from "../../helper/constants/localStorageKey.ts";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedUser, setselectedUser] = useState();
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [EditData, setEditData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUserList();
  }, []);

  // Function to fetch user data
  const fetchUserList = () => {
    const data = localStorage.getItem("users");
    if (data !== null) {
      const users = JSON.parse(data);
      console.log("Users ---> ", users);
      setUserList(users);
    }
  };

  // Function to delete the user data
  const callToDeleteUser = () => {
    let loggedUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    if(loggedUser.email === selectedUser.email){
      alert("You can't delete this user");
      return;
    }
    const users = [...userList];
    let filterUser = users.filter((item) => item.email !== selectedUser.email);
    saveDataToLocalStorage("users", filterUser);
    fetchUserList();
  };

  // Function to Edit the user data
  const callToEditUser = () => {
    let loggedUser = getDataToLocalStorage(localKey.LOGGED_IN_USER);
    if(loggedUser.email === selectedUser.email){
      alert("You can't Edit this user");
      return;
    }
    let users = [...userList];
    let index = users.findIndex((item) => item.email === selectedUser.email);
    users[index] = EditData;
    saveDataToLocalStorage("users", users);
    fetchUserList();
  };

  // Function to handle changes in user data
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setEditData({ ...EditData, [name]: value });
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center mt-3">
      <div class="card w-75">
        <div class="card-body">
          <div className="w-100 d-flex flex-column align-self-center">
            <h3>Users</h3>
            <table class="w-100 table table-striped">
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
                {userList.length > 0
                  ? userList.map((user) => {
                      return (
                        <tr>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                setOpenEditModal(true);
                                setselectedUser(user);
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
                                setselectedUser(user);
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
        onSave={(e) => {
          // CallToDeleteUserByAdmin();
          callToDeleteUser();
          setOpenDeleteModel(false);
        }}
        isLoading={false}
        saveButtonTitle={"Delete"}
        cancelButtonTitle={"Cancel"}
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
        onSave={(e) => {
          callToEditUser();
          setOpenEditModal(false);
        }}
        isLoading={false}
        saveButtonTitle={"Edit"}
        cancelButtonTitle={"Cancel"}
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
    </div>
  );
}

export default UserList;
