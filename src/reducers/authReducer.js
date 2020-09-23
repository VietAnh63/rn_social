import {act} from 'react-test-renderer';
import * as actionTypes from '../actions/actionTypes';

const initialAuthState = {
  user: '',
  token: '',
  me: null,
  book: [],
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, token: action.payload};
    case actionTypes.REMOVE_AUTH:
      return initialAuthState;
    case actionTypes.SET_ME:
      return {...state, me: action.payload};
    case actionTypes.BOOK_MARK:
      return {...state, book: [...state.book, action.payload]};
    case actionTypes.REMOVE_BOOK_MARK:
      const newState = state.book.filter((val) => val._id !== action.payload);
      return {...state, book: newState};
    case actionTypes.CLEAR_BOOK:
      return {...state, book: []};
    default:
      return state;
  }
};
