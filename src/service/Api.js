import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://social.hungvu.net',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

export const login = (params) => {
  return instance.post('/login', params);
};

export const signup = (params) => {
  return instance.post('/signup', params);
};

export const getall = () => {
  return instance.get('/get-all-post');
};
