const initialState = { isLoading: true };

const loader = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE': {
      return {
        isLoading: action.payload
      };
    }
    default:
      return state;
  }
};

export default loader;
