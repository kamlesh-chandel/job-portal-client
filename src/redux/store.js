import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './authSlice.js';
import companySlice from './companySlice';
import jobSlice from './jobSlice';
import submissionSlice from './submissionSlice';
import bookmarkSlice from './bookmarkSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  company: companySlice,
  job: jobSlice,
  submission: submissionSlice,
  bookmark: bookmarkSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
