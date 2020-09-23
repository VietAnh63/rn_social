import axios from 'axios';
import {store} from '../../App';

const instance = axios.create({
  baseURL: 'http://social.hungvu.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});
instance.interceptors.request.use((config) => {
  const {token} = store.getState().auth;
  return {
    ...config,
    headers: {...config.headers, Authorization: `Bearer ${token}`},
  };
});

export const login = (params) => {
  return instance.post('/login', params);
};

export const signup = (params) => {
  return instance.post('/signup', params);
};

export const getall = (params) => {
  return instance.get('/get-all-post/', {params});
};

export const createPost = (params) => {
  return instance.post('/create-post', params);
};

export const getMe = async (params) => {
  return await instance.get(`/get-me`, params);
};

export const updatePost = async (params) => {
  return instance.put('/update-post', params);
};

export const upLoadAvatar = async (params) => {
  return await instance.put('/update-user', params);
};

export const deletePost = (params) => {
  return instance.delete('/post-delete-many', {data: params});
};
