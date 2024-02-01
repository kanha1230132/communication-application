import React, { useState } from "react";
import "./index.css";
import RegisterViewModal from "../../viewModal/registerViewModal";

function Register() {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    showToast,
    showToastMessage,
  } = RegisterViewModal();
  return (
    <div className="login-container">
      <h1>Register </h1>

      <form>
        <div className="row mb-3">
          <label htmlFor="inputEmail13" className="col-sm-10 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail13"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail113" className="col-sm-10 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail113"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail23" className="col-sm-10 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail23"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail33" className="col-sm-10 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputEmail33"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword43" className="col-sm-10 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword43"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          // href={PathName.registerSuccessPath}
          className="btn btn-primary align-middle"
        >
          Register
        </button>
      </form>

      {/* <CustomToast message={"Registration Success"} /> */}
      <div
        className={`toast ${showToast ? "show" : ""} bg-success`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <div className="toast-body text-white">
          {showToastMessage}
        </div>
      </div>
    </div>
  );
}

export default Register;
