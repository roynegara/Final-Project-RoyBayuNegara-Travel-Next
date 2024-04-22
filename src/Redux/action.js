// actions.js
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};





// export const setLoggedUser = (user) => ({
//     type: 'SET_LOGGED_IN_USER',
//     payload: user,
// })

// export const setAuthStatus = (status) => ({
//     type: 'SET_AUTH_STATUS',
//     payload: status,
// })
