import * as actionTypes from '../actions/actionTypes';

const initialAuthState = {
  user: '',
  token: '',
};

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {...state, token: action.payload};
    case actionTypes.REMOVE_AUTH:
      return initialAuthState;

    default:
      return state;
  }
};
