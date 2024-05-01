import { createStore } from 'redux';
import rootReducer from './reducers'; // Anda perlu membuat file reducers.js terlebih dahulu

const store = createStore(rootReducer);

export default store;


// store.js
// import { createStore } from "redux";
// import rootReducer from "./rootReducer";

// const store = createStore(rootReducer);

// export default store;

// import { createStore, combineReducers } from "redux";
// import authReducer from "@/Redux/features/authSlice";

// // Gabungkan reducer menjadi satu root reducer
// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// // Buat store dengan root reducer
// const store = createStore(rootReducer);

// export default store;
