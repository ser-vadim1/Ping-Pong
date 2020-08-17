const initAuthReducec = {
  isAuth: false,
};

export const authReducer = (state = initAuthReducec, action) => {
  if (action.type === "SET_AUTH") {
    return {
      ...state,
      isAuth: true,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuth: false,
    };
  }
  return state;
};
