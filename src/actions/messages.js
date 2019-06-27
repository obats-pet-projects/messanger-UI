import { httpService } from '../api/axios';
import { setAppErrors } from './appErrors';
import { setLoadingState } from './loader';

export function fetchMessagesByCategory(category) {
  return dispatch => {
    httpService()
      .get(`/messages/mail/category/?category=${category}`)
      .then(({ data }) => {
        dispatch(setMessages(data));
        dispatch(setLoadingState(false));
        dispatch(setAppErrors({}));
      })
      .catch(() =>
        dispatch(
          setAppErrors({
            type: 'server',
            message: 'Server error. Please try again later'
          })
        )
      );
  };
}

export function newMessageService(values) {
  return dispatch => {
    httpService()
      .post('/messages', values)
      .then(() => {
        dispatch(setMessageSendStatus(true));
      })
      .catch(() =>
        dispatch(
          setAppErrors({
            type: 'server',
            message: 'Server error. Please try again later'
          })
        )
      );
  };
}

export function setMessages(messages) {
  return { type: 'SET_MESSAGES', messages };
}

export function setMessageSendStatus(status) {
  return { type: 'SET_MESSAGE_SEND_STATUS', status };
}
