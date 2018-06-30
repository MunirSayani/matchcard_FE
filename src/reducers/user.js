import { USER_LOGGED_IN } from '../types';

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      console.log('recieved user logged in action');
      return action.user;
    default:
      console.log('default state ru');
      return state;
  }
}
