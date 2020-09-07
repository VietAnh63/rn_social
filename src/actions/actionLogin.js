export const loginHome = (isoke) => {
  return {
    type: 'LOGIN',
    payload: true,
  };
};

export const logoutHome = (isoke) => {
  return {
    type: 'LOGOUT',
    payload: false,
  };
};
