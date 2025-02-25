// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Path to your authSlice
import careerReducer from './slices/careerSlice'; // Path to your authSlice
import contactReducer from './slices/contactSlice'; // Path to your authSlice
import serviceReducer from './slices/serviceSlice'; // Path to your authSlice
import userReducer from './slices/userSlice'; // Path to your authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    career: careerReducer,
    contact: contactReducer,
    //blog: blogReducer,
    service: serviceReducer,
    users:userReducer
  },
});

// Export the store as default
export default store;
