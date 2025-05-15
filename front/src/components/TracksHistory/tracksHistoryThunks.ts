import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { ITracksHistory } from '../../types';

export const getAllTracksHistoryThunk = createAsyncThunk<ITracksHistory[], void>(
  'tracks/getAllTracksHistoryThunk',
  async () => {
    const { data } = await axiosAPI.get('/track_history', { withCredentials: true });
    return data;
  },
);
