let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'react-test-munir925.c9users.io') {
  backendHost = 'https://react-test-munir925.c9users.io/';
} else if(hostname === 'localhost') {
  backendHost = 'http://localhost:3001';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
