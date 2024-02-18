import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./style.css"

function MyModal({ children, openModal, closeModal, closeOnBackdropClick, title, customFooter, isCenter, onSave, isLoading, cancelButtonTitle, saveButtonTitle, type="primary" }) {
 const handleClose = (event) => {
    if (closeOnBackdropClick){
      closeModal()
    }
 };

 return (
      <Modal  show={openModal} onHide={handleClose} backdropClassName="custom-backdrop" dialogClassName={isCenter ? "w-25 modal-dialog-centered" : null}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            {customFooter ? customFooter : (
            <>
              <Button variant="secondary" onClick={closeModal}>
               {cancelButtonTitle || "Cancel"}
              </Button>
              <Button variant={type} onClick={onSave}>
                {isLoading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
               {saveButtonTitle || "Save Changes"} 
              </Button>
            </>
            )}
          </Modal.Footer>
        </Modal>
 );
}

export default MyModal;
