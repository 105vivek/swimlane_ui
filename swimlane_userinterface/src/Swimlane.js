// src/Swimlane.js
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Block from "./Block.js";
import { Card } from "react-bootstrap";

const Swimlane = ({ lane, blocks, onBlockClick }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="text-center font-weight-bold">{lane}</Card.Header>
      <Droppable droppableId={lane}>
        {(provided, snapshot) => (
          <Card.Body
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "400px",
              background: snapshot.isDraggingOver ? "#e9ecef" : "#f8f9fa",
            }}
          >
            {blocks.map((block, index) => (
              <Block
                key={block.id}
                block={block}
                index={index}
                onClick={() => onBlockClick(block)}
              />
            ))}
            {provided.placeholder}
          </Card.Body>
        )}
      </Droppable>
    </Card>
  );
};

export default Swimlane;
