import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSLice } from '../../api/apiSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import globalSlice from '../Features/globalSlice';
import userAuthSlice from '../Features/userAuthSlice';
import userDatasSlice from '../Features/userDatasSlice';
import notifsSlice from '../Features/notifsSlice';

const rootReducers = combineReducers({
  notifsSlice,
  globalSlice,
  userAuthSlice,
  userDatasSlice,
  [apiSLice.reducerPath]: apiSLice.reducer,
});

const persistConfig = {
  key: 'whooshNG-Admin',
  storage,
};

export type RootReducer = ReturnType<typeof rootReducers>;

const persistedReducer = persistReducer<RootReducer, AnyAction>(
  persistConfig,
  rootReducers,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSLice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
