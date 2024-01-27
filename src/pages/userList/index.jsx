import React from "react";

function UserList() {
  return (
    
    <div className="w-100 d-flex flex-column align-self-center">
 <div className="w-75 d-flex flex-column align-self-center">
      <h3>Users</h3>
        <table class="w-100 table table-striped">
          <thead>
            <tr>
              <th scope="col">Name </th>
              <th scope="col">User EmailId</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <a href="">Edit</a>
                <span> | </span>
                <a href="">Delete</a>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <a href="">Edit</a>
                <span> | </span>
                <a href="">Delete</a>
              </td>
            </tr>
            <tr>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>
                <a href="">Edit</a>
                <span> | </span>
                <a href="">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
   
  );
}

export default UserList;
