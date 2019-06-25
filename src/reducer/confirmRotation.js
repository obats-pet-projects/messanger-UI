const initialState = { isLoading: false };

const confirmRotation = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONFIRM_ROTATION': {
      return {
        isRotate: true
      };
    }
    default:
      return state;
  }
};

export default confirmRotation;
