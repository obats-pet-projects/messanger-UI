const initialState = { messagesList: [], isSent: false };

const messages = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGES': {
      return {
        ...state,
        messagesList: action.messages
      };
    }
    case 'SET_MESSAGE_SEND_STATUS': {
      return {
        ...state,
        isSent: action.status
      };
    }
    default:
      return state;
  }
};

export default messages;
