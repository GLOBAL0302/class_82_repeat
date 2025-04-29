import { configureStore, createSlice } from '@reduxjs/toolkit';
import { IAlbums } from '../../types';
import { getAllAlbumsThunk } from './albumsThunks';

interface albumState {
  albums: IAlbums[];
  albumsLoading: boolean;
  albumsError: boolean;
}

const initialState: albumState = {
  albums: [],
  albumsLoading: false,
  albumsError: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAlbumsThunk.pending, (state) => {
      state.albumsLoading = true;
    }),
      builder.addCase(getAllAlbumsThunk.fulfilled, (state, { payload }) => {
        state.albumsLoading = false;
        state.albums = payload;
      }),
      builder.addCase(getAllAlbumsThunk.rejected, (state) => {
        state.albumsLoading = false;
      });
  },
  selectors: {
    selectAllAlbums: (state) => state.albums,
    selectAllAlbumsLoading: (state) => state.albumsLoading,
    selectAllAlbumsError: (state) => state.albumsError,
  },
});

export const albumsReducer = albumsSlice.reducer;
export const { selectAllAlbums, selectAllAlbumsError, selectAllAlbumsLoading } = albumsSlice.selectors;
