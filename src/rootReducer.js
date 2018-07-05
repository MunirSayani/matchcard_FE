import { combineReducers } from 'redux';
import user from './reducers/user';
import feature from './reducers/feature';

export default combineReducers({
  user,
  feature
});
