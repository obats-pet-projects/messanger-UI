import { httpService } from '../api/axios';
import { saveUserData } from './user';
import { setAppErrors } from './appErrors';

export function authService(url, credentials) {
  return dispatch => {
    httpService()
      .post(url, credentials)
      .then(({ data, headers }) => {
        const { id, username, email } = data.user;
        localStorage.setItem('access-token', headers['access-token']);

        dispatch(saveUserData({ id, username, email }));
        dispatch(setAppErrors({}));
      })
      .catch(({ response }) => {
        if (response) {
          const { message } = response.data;

          if (response.status === 422) {
            return dispatch(setAppErrors({ type: 'credential', message }));
          }
          return dispatch(setAppErrors({ type: 'server', message }));
        }
        return dispatch(
          setAppErrors({ type: 'server', message: 'Server error. Please try again later' })
        );
      });
  };
}
