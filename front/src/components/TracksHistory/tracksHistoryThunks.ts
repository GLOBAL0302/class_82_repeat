import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { RootState } from '../../store/store';
import { ITracksHistory } from '../../types';

export const getAllTracksHistoryThunk = createAsyncThunk<ITracksHistory[], void, { state: RootState }>(
  'tracks/getAllTracksHistoryThunk',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    const { data } = await axiosAPI.get('/track_history', { headers: { Authorization: token } });
    return data;
  },
);
