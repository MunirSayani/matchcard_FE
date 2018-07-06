import { FEATURE_LOADED } from '../types';

export default function feature(state = {}, action = {}) {
  switch (action.type) {
    case FEATURE_LOADED:
      return action.feature;
    default:
      return state;
  }
}
