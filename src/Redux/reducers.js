// reducers.js
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;







// const initialState = {
//     loggedInUser: {},
//     isAuthenticated: false,
//   };
  
//   const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_LOGGED_IN_USER':
//         return {
//           ...state,
//           loggedInUser: action.payload,
//         };
//       case 'SET_AUTH_STATUS':
//         return {
//           ...state,
//           isAuthenticated: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default authReducer;
  