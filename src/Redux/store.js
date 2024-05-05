import { createStore } from 'redux';
import rootReducer from './reducers'; // Anda perlu membuat file reducers.js terlebih dahulu

const store = createStore(rootReducer);


export default store;
