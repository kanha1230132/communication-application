import React from "react";

function DocumentList() {
  return (
    <div className="w-100 d-flex flex-column align-self-center">
      <div className="w-75 d-flex flex-column align-self-center">
        <h3>My Uploads</h3>
        <table class="w-100 table table-striped">
          <thead>
            <tr>
              <th scope="col">Label </th>
              <th scope="col">File Name</th>
              <th scope="col">Action</th>
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
                <span> | </span>
                <a href="">Share</a>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <a href="">Edit</a>
                <span> | </span>
                <a href="">Delete</a>
                <span> | </span>
                <a href="">Share</a>
              </td>
            </tr>
            <tr>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>
                <a href="">Edit</a>
                <span> | </span>
                <a href="">Delete</a>
                <span> | </span>
                <a href="">Share</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-100 d-flex flex-column align-items-center">
        <div class="card w-75">
          <div class="card-body">
            <div className="w-75 d-flex flex-column align-self-center">
              <h3>Shared Uploads</h3>
              <table class="w-100 table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Label </th>
                    <th scope="col">File Name</th>
                    <th scope="col">Shared By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    <td>abc@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-75 d-flex flex-column align-self-center">
              <a className="w-25 text-decoration-none btn btn-primary" href="">
                + Add Uploads
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentList;
