import { combineReducers } from 'redux';
import user from './user';
import loader from './loader';
import appErrors from './appErrors';
import messages from './messages';

export default combineReducers({ user, loader, appErrors, messages });
