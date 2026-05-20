import "../styling/AlertModal.css";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const AlertModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please fill in all the fields to proceed.</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default AlertModal;
