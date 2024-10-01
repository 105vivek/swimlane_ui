// src/Filter.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "./store.js";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Filter = () => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const applyFilter = (e) => {
    e.preventDefault();
    const filter = {};
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    dispatch(setFilter(filter));
  };

  const clearFilter = () => {
    setPriority("");
    setAssignedTo("");
    dispatch(setFilter({}));
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={applyFilter}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="filterPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filterAssignedTo">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter assignee"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" type="submit" className="mr-2">
                Apply Filter
              </Button>
              <Button variant="secondary" onClick={clearFilter}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Filter;
