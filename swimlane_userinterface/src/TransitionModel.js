// src/TransitionModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TransitionModal = ({ show, handleClose, handleConfirm, newState }) => {
  const [comment, setComment] = useState("");

  const onSubmit = () => {
    handleConfirm({ comment });
    setComment("");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Transition to {newState}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="transitionComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a comment for the transition"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          {/* Add more fields as needed */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransitionModal;
