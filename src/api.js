import axios from 'axios';
import { API_ROOT } from './api-config';

export default {
  user: {
    login: auth =>
      axios.post(API_ROOT + '/user_token', { auth }).then(res => res.data.user)
  }
};
