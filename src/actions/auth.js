import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = auth => dispatch =>
  api.user.login(auth).then(user => {
    localStorage.appJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('appJWT');
  dispatch(userLoggedOut());
};
