import { httpService } from '../api/axios';

export function signUpService(values) {
  return () => {
    httpService().post('/auth/signup', values);
  };
}

export function setConfirmRotation() {
  return { type: 'SET_CONFIRM_ROTATION' };
}
