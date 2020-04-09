const INITIAL_STATE = {
  activeUsers: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_USERS':
      return {
        ...state,
        activeUsers: action.activeUsers,
      };
    default:
      return state;
  }
};

export default userReducer;
