const DEFAULT_STATE = {
  notes: ['test'],
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default notesReducer;
