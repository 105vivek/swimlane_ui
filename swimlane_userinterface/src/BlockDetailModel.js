// src/BlockDetailModal.js
import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const BlockDetailModal = ({ show, handleClose, block }) => {
  if (!block) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{block.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Current State:</strong> {block.state}
        </p>
        <p>
          <strong>Priority:</strong> {block.attributes.priority}
        </p>
        <p>
          <strong>Assigned To:</strong> {block.attributes.assignedTo}
        </p>
        <h5>Transition History</h5>
        <ListGroup variant="flush">
          {block.history.map((entry, index) => (
            <ListGroup.Item key={index}>
              <strong>State:</strong> {entry.state} <br />
              <strong>Timestamp:</strong>{" "}
              {new Date(entry.timestamp).toLocaleString()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlockDetailModal;
