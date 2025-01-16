import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/ProductSlice';
 
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
 
export default store;