import { USER_LOGGED_IN } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const login = auth => dispatch =>
  api.user.login(auth).then(user => {
    console.log('in auth.js', user);
    dispatch(userLoggedIn(user));
    console.log('dispatched');
  });
