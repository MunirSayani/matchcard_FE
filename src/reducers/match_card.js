import { MATCHCARD_LOADED } from '../types';

export default function match_card(state = {}, action = {}) {
  switch (action.type) {
    case MATCHCARD_LOADED:
      console.log(action.match_card);
      return action.match_card;
    default:
      return state;
  }
}
