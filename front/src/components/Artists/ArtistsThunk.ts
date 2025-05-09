import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { IArtists, IArtistsMutation } from '../../types';

export const getAllArtistsThunk = createAsyncThunk<IArtists[], void>('artists/getAllArtistsThunk', async () => {
  const { data } = await axiosAPI.get('/artists');
  return data;
});

export const postArtistThunk = createAsyncThunk<void, IArtistsMutation>('artists/postArtistThunk', async (artist) => {
  const formData = new FormData();
  const keys = Object.keys(artist) as (keyof IArtistsMutation)[];
  keys.forEach((key) => {
    const value = artist[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  await axiosAPI.post('/artists', formData);
});
