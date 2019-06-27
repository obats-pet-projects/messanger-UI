import { httpService } from '../api/axios';
import { setLoadingState } from './loader';

export function fetchUserData() {
  return dispatch => {
    httpService()
      .get('/auth/validate')
      .then(({ data }) => {
        dispatch(setLoadingState(false));

        if (!data.success && data.message) {
          return null;
        }

        const { id, username, email } = data;
        dispatch(saveUserData({ id, username, email }));
      })
      .catch(() => {
        dispatch(setLoadingState(false));
      });
  };
}

export function saveUserData(userData) {
  return { type: 'SAVE_USER_DATA', userData };
}

export function handleSignOut() {
  localStorage.removeItem('access-token');
  return { type: 'HANDLE_SIGN_OUT' };
}
