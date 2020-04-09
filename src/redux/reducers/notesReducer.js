const DEFAULT_STATE = {
  notes: [],
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_MESSAGES':
      return {
        ...state,
        notes: action.notes,
      };
    default:
      return state;
  }
};

export default notesReducer;
