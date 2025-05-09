import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { ITracks, ITracksMutation } from '../../types';

export const getAllTracksThunk = createAsyncThunk<ITracks[], string>('tracks/getAllTracksThunk', async (id) => {
  const { data } = await axiosAPI.get(`/tracks?albumId=${id}`);
  return data;
});

export const addTrackToHistoryThunk = createAsyncThunk<void, { trackId: string; token: string }>(
  'track/addTrackToHistoryThunk',
  async ({ trackId, token }) => {
    const { data } = await axiosAPI.post('/track_history', { trackId }, { headers: { Authorization: token } });
    return data;
  },
);

export const PostTrack = createAsyncThunk<void, ITracksMutation>('tracks/PostTrack', async (item) => {
  const formData = new FormData();
  const keys = Object.keys(item) as (keyof ITracksMutation)[];
  keys.forEach((key) => {
    const value = item[key];

    if (value !== null) {
      console.log(key, value);
      formData.append(key, value);
    }
  });
  await axiosAPI.post('/tracks', item);
});
