import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../components/Artists/artistsSlice';
import { albumsReducer } from '../components/Albums/albumsSlice';
import { tracksReducer } from '../components/Tracks/tracksSlice';
import { usersReducer } from '../components/Users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { tracksHistoryReducer } from '../components/TracksHistory/tracksHistorySlice';
import axiosAPI from '../axiosApi';
import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().users.user?.token;
  if (!token) return config;

  const headers = config.headers as AxiosHeaders;
  headers.set('Authorization', 'Bearer ' + token);
  return config;
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
