import { FEATURE_SELECTED } from '../types';

export default function feature(state = {}, action = {}) {
  switch (action.type) {
    case FEATURE_SELECTED:
      return action.feature;
    default:
      return state;
  }
}
