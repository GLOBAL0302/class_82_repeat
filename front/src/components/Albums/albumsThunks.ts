import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { IAlbums } from '../../types';

export const getAllAlbumsThunk = createAsyncThunk<IAlbums[], string>('albums/getAllAlbumsThunk', async (id) => {
  const { data } = await axiosAPI.get(`/albums?artistId=${id}`);
  return data;
});
