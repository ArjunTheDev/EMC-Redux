import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from './feature/jokesSlice';

export default configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});
