import React from "react";

function DocumentList() {
  return (
    <div className="w-100 d-flex flex-column align-self-center">
      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div class="card w-75">
          <div class="card-body w-100">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>My Uploads</h3>
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
                <tbody style={{maxHeight:250, overflow:'scroll'}}>
                  {[1, 1, 11, 1, 1, 1, 1, 1, , 1].map((item) => {
                    return (
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
                    );
                  })}
                </tbody> 
                
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 d-flex flex-column align-items-center mt-3">
        <div class="card w-75">
          <div class="card-body">
            <div className="w-100 d-flex flex-column align-self-center">
              <h3>Shared Uploads</h3>
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
