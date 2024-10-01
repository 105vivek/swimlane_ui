// src/Block.js
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";

const Block = ({ block, index, onClick }) => {
  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided, snapshot) => (
        <Card
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2"
          style={{
            cursor: "pointer",
            background: snapshot.isDragging ? "#d1ecf1" : "#ffffff",
            ...provided.draggableProps.style,
          }}
        >
          <Card.Body>
            <Card.Title>{block.title}</Card.Title>
            <Card.Text>
              <strong>Priority:</strong> {block.attributes.priority}
            </Card.Text>
            <Card.Text>
              <strong>Assigned To:</strong> {block.attributes.assignedTo}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default Block;
