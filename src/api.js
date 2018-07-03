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
        .then(res => res.data.user)
  }
};
