import { combineReducers } from 'redux';
import counter from './counter';
import auth from './auth';

export default combineReducers({
    auth, counter
});