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
  },
  matchcard: {
    loadMatchCard: id => axios.get(API_ROOT + '/match_cards/' + id, {}),
    updateMatchCard: match_card =>
      axios.put(API_ROOT + '/match_cards/' + match_card.id, { match_card }),
    createMatch: match => axios.post(API_ROOT + '/matches', match),
    deleteMatch: id => axios.delete(API_ROOT + '/matches/' + id, {})
  }
};
