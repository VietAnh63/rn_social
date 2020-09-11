import * as actionTypes from './actionTypes';

export const setAuth = (token) => {
  return {
    type: actionTypes.SET_AUTH,
    //detail la gia tri gui di
    payload: token,
  };
};
export const removeAuth = () => {
  return {
    type: actionTypes.REMOVE_AUTH,
  };
};
