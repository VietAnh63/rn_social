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

export const setMe = (user) => {
  return {
    type: actionTypes.SET_ME,
    payload: user,
  };
};

export const bookMark = (title) => {
  return {
    type: actionTypes.BOOK_MARK,
    payload: title,
  };
};

export const removeBook = (id) => {
  return {
    type: actionTypes.REMOVE_BOOK_MARK,
    payload: id,
  };
};

export const clearBook = (title) => {
  return {
    type: actionTypes.CLEAR_BOOK,
    payload: title,
  };
};
