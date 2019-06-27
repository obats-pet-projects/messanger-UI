const initialState = { userData: null, isLogged: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_DATA': {
      return {
        userData: action.userData,
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
