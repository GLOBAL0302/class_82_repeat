import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITracksHistory } from '../../types';
import { getAllTracksHistoryThunk } from './tracksHistoryThunks';

interface ITracksHistoryState {
  tracksHistory: ITracksHistory[];
  tracksHistoryLoading: boolean;
}

const initialState: ITracksHistoryState = {
  tracksHistory: [],
  tracksHistoryLoading: false,
};

const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTracksHistoryThunk.pending, (state) => {
      state.tracksHistoryLoading = true;
    }),
      builder.addCase(getAllTracksHistoryThunk.fulfilled, (state, { payload }) => {
        state.tracksHistoryLoading = false;
        state.tracksHistory = payload;
      });
    builder.addCase(getAllTracksHistoryThunk.rejected, (state) => {
      state.tracksHistoryLoading = false;
    });
  },
  selectors: {
    selectAllTracksHistory: (state) => state.tracksHistory,
    selectAllTrackHistoryLoading: (state) => state.tracksHistoryLoading,
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const { selectAllTrackHistoryLoading, selectAllTracksHistory } = tracksHistorySlice.selectors;
