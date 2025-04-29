import { createSlice } from '@reduxjs/toolkit';
import { ITracks } from '../../types';
import { getAllTracksThunk } from './tracksThunks';

interface tracksState {
  tracks: ITracks[];
  tracksLoading: boolean;
  tracksError: boolean;
}

const initialState: tracksState = {
  tracks: [],
  tracksLoading: false,
  tracksError: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTracksThunk.pending, (state) => {
      state.tracksLoading = true;
    });
    builder.addCase(getAllTracksThunk.fulfilled, (state, { payload }) => {
      state.tracksLoading = false;
      state.tracks = payload;
    });
    builder.addCase(getAllTracksThunk.rejected, (state) => {
      state.tracksLoading = false;
    });
  },
  selectors: {
    selectAllTracks: (state) => state.tracks,
    selectAllTracksLoading: (state) => state.tracksLoading,
    selectAllTracksError: (state) => state.tracksError,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { selectAllTracks, selectAllTracksError, selectAllTracksLoading } = tracksSlice.selectors;
