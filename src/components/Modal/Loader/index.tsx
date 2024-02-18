import React from "react";
import "./style.css";
import { Modal } from "react-bootstrap";

function Loader({ isLoading }) {
  return (
    <Modal
      show={!!isLoading}
      backdropClassName="custom-backdrop"
      className="d-flex align-content-center justify-content-center custom-modal"
      dialogClassName="modal-dialog-centered"
    >
      {
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    </Modal>
  );
}

export default Loader;
