import { httpService } from '../api/axios';
import { setLoadingState } from './loader';
import { errorToaster } from '../components/UI/Toaster/Toaster';

export function fetchUserData() {
  return dispatch => {
    httpService()
      .get('/auth/validate')
      .then(({ data }) => {
        if (!data.success && data.message) {
          dispatch(setLoadingState(false));
          return null;
        }

        const { id, username, email } = data;
        dispatch(saveUserData({ id, username, email }));
        dispatch(setLoadingState(false));
      })
      .catch(() => {
        dispatch(setLoadingState(false));
        errorToaster('Server is down. Please try again later');
      });
  };
}

export function saveUserData(data) {
  return { type: 'SAVE_USER_DATA', payload: data };
}

export function handleSignOut() {
  return { type: 'HANDLE_SIGN_OUT' };
}
