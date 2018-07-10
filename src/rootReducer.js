import { combineReducers } from 'redux';
import user from './reducers/user';
import feature from './reducers/feature';
// eslint-disable-next-line
import match_card from './reducers/match_card';
import entities from './reducers/entities';

export default combineReducers({
  user,
  feature,
  match_card,
  entities
});
