const initialState = { type: '', message: '' };

const appErrors = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_ERRORS': {
      return {
        type: action.payload.type,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
};

export default appErrors;
