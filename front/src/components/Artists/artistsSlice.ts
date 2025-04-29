import { createSlice } from '@reduxjs/toolkit';
import { IArtists } from '../../types';
import { getAllArtistsThunk } from './ArtistsThunk';

interface IArtistState {
  artists: IArtists[];
  artistsLoading: boolean;
  artistsError: boolean;
}

const initialState: IArtistState = {
  artists: [],
  artistsLoading: false,
  artistsError: false,
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllArtistsThunk.pending, (state) => {
      state.artistsLoading = true;
    }),
      builder.addCase(getAllArtistsThunk.fulfilled, (state, { payload }) => {
        state.artistsLoading = false;
        state.artists = payload;
      }),
      builder.addCase(getAllArtistsThunk.rejected, (state) => {
        state.artistsLoading = false;
        state.artistsError = false;
      });
  },
  selectors: {
    selectAllArtists: (state) => state.artists,
    selectAllArtistsLoading: (state) => state.artistsLoading,
    selectAllArtistsError: (state) => state.artistsError,
  },
});

export const artistsReducer = artistSlice.reducer;
export const { selectAllArtists, selectAllArtistsError, selectAllArtistsLoading } = artistSlice.selectors;
