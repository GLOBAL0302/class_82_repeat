import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../components/Artists/artistsSlice';
import { albumsReducer } from '../components/Albums/albumsSlice';
import { tracksReducer } from '../components/Tracks/tracksSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
