import _ from 'lodash';
import { MATCHCARD_LOADED, MATCH_CREATED, MATCH_DELETED } from '../types';

export default function match_card(state = {}, action = {}) {
  switch (action.type) {
    case MATCHCARD_LOADED:
      return action.match_card;
    case MATCH_CREATED:
      return {
        ...state,
        matches: Object.assign({}, state.matches, action.match)
      };
    case MATCH_DELETED:
      return {
        ...state,
        matches: _.omit(state.matches, [action.matchId])
      };
    default:
      return state;
  }
}
