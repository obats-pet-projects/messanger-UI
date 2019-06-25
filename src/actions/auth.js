import { httpService } from '../api/axios';
import { saveUserData } from './user';

export function signUpService(values) {
  return dispatch => {
    httpService()
      .post('/auth/signup', values)
      .then(({ data, headers }) => {
        const { id, username, email } = data.user;

        dispatch(setConfirmRotation());

        dispatch(saveUserData({ id, username, email }));
        localStorage.setItem('access-token', headers['access-token']);
      })
      .catch(({ response }) => {
        if (response) {
          const { message } = response.data;

          if (response.status === 422) {
            dispatch(setAuthError({ type: 'credential', message }));
          } else {
            dispatch(setAuthError({ type: 'other', message }));
          }
        } else {
          dispatch(
            setAuthError({
              type: 'server',
              message: 'Server is down. Please try again later'
            })
          );
        }
      });
  };
}

export function setConfirmRotation() {
  return { type: 'SET_CONFIRM_ROTATION' };
}

export function setAuthError(data) {
  return { type: 'SET_AUTH_ERROR', payload: data };
}
