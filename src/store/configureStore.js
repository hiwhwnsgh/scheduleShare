import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import inputReducer from './reducers';
import dateReducer from './dateReducers';
import tagsReducer from './tagSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    input: inputReducer,
    date : dateReducer,
    tags : tagsReducer,
    auth : authReducer,
    user : userReducer,
  },
   middleware: getDefaultMiddleware({
     serializableCheck: false,
   }),
});

export default store;