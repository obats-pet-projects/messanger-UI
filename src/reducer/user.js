const initialState = { isLogged: false, userData: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_DATA': {
      return {
        userData: action.payload,
        isLogged: true
      };
    }
    case 'HANDLE_SIGN_OUT': {
      return {
        userData: null,
        isLogged: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
