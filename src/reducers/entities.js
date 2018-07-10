import { ENTITIES_LOADED } from '../types';

export default function entities(state = {}, action = {}) {
  switch (action.type) {
    case ENTITIES_LOADED:
      return action.entities;
    default:
      return state;
  }
}
