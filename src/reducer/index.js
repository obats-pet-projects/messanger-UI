import { combineReducers } from 'redux';
import user from './user';
import authError from './authError';
import loader from './loader';

export default combineReducers({ user, authError, loader });
