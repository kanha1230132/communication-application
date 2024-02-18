import React from "react";
import AllFilesImporter from "../../hooks/customFileHooks/index.tsx";

function RegisterSuccessFully() {
  const { imageUrl, PathName } = AllFilesImporter();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card col-3  d-flex justify-content-center p-5 ">
        <img
          src={imageUrl.SuccessImg}
          className="card-img-top  w-25 h-25 d-flex align-self-center mt-10"
          alt="..."
        />
        <div className="card-body d-flex flex-column justify-content-center">
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
