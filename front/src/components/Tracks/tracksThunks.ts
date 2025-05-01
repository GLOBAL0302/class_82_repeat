import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { ITracks } from '../../types';

export const getAllTracksThunk = createAsyncThunk<ITracks[], string>('tracks/getAllTracksThunk', async (id) => {
  const { data } = await axiosAPI.get(`/tracks?albumId=${id}`);
  return data;
});

export const addTrackToHistoryThunk = createAsyncThunk<void, { trackId: string; token: string }>(
  'track/addTrackToHistoryThunk',
  async ({ trackId, token }) => {
    const { data } = await axiosAPI.post('/track_history', { trackId }, { headers: { Authorization: token } });
    console.log(data);
  },
);
