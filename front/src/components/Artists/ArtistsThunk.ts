import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { IArtists } from '../../types';

export const getAllArtistsThunk = createAsyncThunk<IArtists[], void>('artists/getAllArtistsThunk', async () => {
  const { data } = await axiosAPI.get('/artists');
  return data;
});
