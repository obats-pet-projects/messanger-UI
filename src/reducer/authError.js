const initialState = { type: '', message: '' };

const authError = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_ERROR': {
      return {
        type: action.payload.type,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
};

export default authError;
