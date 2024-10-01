// src/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
const initialState = {
  lanes: ["To Do", "In Progress", "Review", "Done"],
  blocks: [
    {
      id: "block-1",
      title: "Task 1",
      state: "To Do",
      attributes: { priority: "High", assignedTo: "Alice" },
      history: [{ state: "To Do", timestamp: "2024-04-01T10:00:00Z" }],
    },
    {
      id: "block-2",
      title: "Task 2",
      state: "In Progress",
      attributes: { priority: "Medium", assignedTo: "Bob" },
      history: [
        { state: "To Do", timestamp: "2024-04-02T09:00:00Z" },
        { state: "In Progress", timestamp: "2024-04-03T11:30:00Z" },
      ],
    },
  ],
  filter: {},
};

// Action Types
const MOVE_BLOCK = "MOVE_BLOCK";
const SET_FILTER = "SET_FILTER";
const ADD_HISTORY = "ADD_HISTORY";
const UPDATE_BLOCK = "UPDATE_BLOCK";

// Action Creators
export const moveBlock = (blockId, newState, data) => ({
  type: MOVE_BLOCK,
  payload: { blockId, newState, data },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const addHistory = (blockId, historyEntry) => ({
  type: ADD_HISTORY,
  payload: { blockId, historyEntry },
});

export const updateBlock = (block) => ({
  type: UPDATE_BLOCK,
  payload: block,
});

// Reducers
const lanesReducer = (state = initialState.lanes, action) => {
  return state;
};

const blocksReducer = (state = initialState.blocks, action) => {
  switch (action.type) {
    case MOVE_BLOCK:
      return state.map((block) => {
        if (block.id === action.payload.blockId) {
          return {
            ...block,
            state: action.payload.newState,
            ...action.payload.data,
            history: [
              ...block.history,
              {
                state: action.payload.newState,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return block;
      });
    case UPDATE_BLOCK:
      return state.map((block) =>
        block.id === action.payload.id ? action.payload : block
      );
    default:
      return state;
  }
};

const filterReducer = (state = initialState.filter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  lanes: lanesReducer,
  blocks: blocksReducer,
  filter: filterReducer,
});

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk));
