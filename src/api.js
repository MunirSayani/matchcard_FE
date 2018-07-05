import axios from 'axios';
import { API_ROOT } from './api-config';

export default {
  user: {
    login: auth =>
      axios.post(API_ROOT + '/user_token', { auth }).then(res => res.data.user),
    signup: user =>
      axios.post(API_ROOT + '/users', { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post(API_ROOT + '/users/confirm', { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post(API_ROOT + '/users/reset_password_request', { email }),
    validateToken: token => axios.post(API_ROOT + '/validate_token', { token }),
    resetPassword: data =>
      axios.post(API_ROOT + '/users/reset_password', { data })
  },
  feature: {
    loadFeatureMatches: () =>
      axios.get(API_ROOT + '/leagues/featured_match_cards', {})
  }
};
