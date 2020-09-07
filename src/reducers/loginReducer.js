const initialState = {
  isoke: false,
};

const activeHome = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isoke: action.payload};
    case 'LOGOUT':
      return {...state, isoke: action.payload};
    default:
      return state;
  }
};
export default activeHome;
