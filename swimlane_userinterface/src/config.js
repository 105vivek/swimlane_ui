// src/config.js
export const masterConfig = {
  lanes: ["To Do", "In Progress", "Review", "Done"],
  transitions: {
    "To Do": ["In Progress"],
    "In Progress": ["Review", "To Do"],
    Review: ["Done", "In Progress"],
    Done: [],
  },
};
