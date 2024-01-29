import React from "react";
import { PathName } from "../../helper/constants/pathNames.ts";
import { imageUrl } from "../../assets/index.ts";

function RegisterSuccessFully() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div class="card col-3  d-flex justify-content-center p-5 ">
        <img
          src={imageUrl.SuccessImg}
          class="card-img-top  w-25 h-25 d-flex align-self-center mt-10"
          alt="..."
        />
        <div class="card-body d-flex flex-column justify-content-center">
          <p className="fw-bold text-center f-3">Register SuccessFully</p>
          <p className="text-center f-3">Thank you for you Registration</p>
          <a className="text-center f-3 bg-red " href={PathName.chatListPath}>
            click to return home page
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccessFully;
