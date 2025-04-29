import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { ITracks } from '../../types';

export const getAllTracksThunk = createAsyncThunk<ITracks[], string>('tracks/getAllTracksThunk', async (id) => {
  const { data } = await axiosAPI.get(`/tracks?albumId=${id}`);
  return data;
});
