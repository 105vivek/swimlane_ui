// src/App.js
import React, { useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, moveBlock } from "./store.js";
import { masterConfig } from "./config.js";
import { DragDropContext } from "react-beautiful-dnd";
import Swimlane from "./Swimlane.js";
import Filter from "./Filter.js";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import TransitionModal from "./TransitionModel.js";
import BlockDetailModal from "./BlockDetailModel.js";

const AppContent = () => {
  const lanes = useSelector((state) => state.lanes);
  const blocks = useSelector((state) => state.blocks);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [transitionModalOpen, setTransitionModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blockToMove, setBlockToMove] = useState(null);
  const [newState, setNewState] = useState("");

  const filteredBlocks = blocks.filter((block) => {
    return Object.keys(filter).every(
      (key) => block.attributes[key] === filter[key]
    );
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceLane = source.droppableId;
    const destLane = destination.droppableId;

    if (sourceLane === destLane) return;

    const allowedTransitions = masterConfig.transitions[sourceLane];
    if (!allowedTransitions.includes(destLane)) {
      alert(`Cannot move to ${destLane} from ${sourceLane}`);
      return;
    }

    const block = blocks.find((b) => b.id === draggableId);
    setBlockToMove(block);
    setNewState(destLane);
    setTransitionModalOpen(true);
  };

  const handleTransitionConfirm = (data) => {
    dispatch(moveBlock(blockToMove.id, newState, data));
    setTransitionModalOpen(false);
    setBlockToMove(null);
    setNewState("");
  };

  const handleTransitionCancel = () => {
    setTransitionModalOpen(false);
    setBlockToMove(null);
    setNewState("");
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleDetailClose = () => {
    setSelectedBlock(null);
  };

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand href="#">Swimlane UI</Navbar.Brand>
      </Navbar>
      <Filter />
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {lanes.map((lane) => (
            <Col key={lane} md>
              <Swimlane
                lane={lane}
                blocks={filteredBlocks.filter((block) => block.state === lane)}
                onBlockClick={handleBlockClick}
              />
            </Col>
          ))}
        </Row>
      </DragDropContext>
      <TransitionModal
        show={transitionModalOpen}
        handleClose={handleTransitionCancel}
        handleConfirm={handleTransitionConfirm}
        newState={newState}
      />
      <BlockDetailModal
        show={!!selectedBlock}
        handleClose={handleDetailClose}
        block={selectedBlock}
      />
    </Container>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
