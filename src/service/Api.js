import axios from 'axios'
import { store } from '../../App';

const instance = axios.create({
  baseURL: 'http://social.hungvu.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 60000
});

instance.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
});

export const login = (params) => {
  return instance.post('/login', params)
}
export const getall = (params) => {
  return instance.get('/get-all-post', { params: params })
}

export function createPost(params) {
  return instance.post(`/create-post`, params);
}