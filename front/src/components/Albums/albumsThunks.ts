import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../axiosApi';
import { IAlbumMutation, IAlbums } from '../../types';

export const getAllAlbumsThunk = createAsyncThunk<IAlbums[], string>('albums/getAllAlbumsThunk', async (id) => {
  console.log(id);
  const { data } = await axiosAPI.get(`/albums?artistId=${id}`);
  return data;
});

export const postAlbumThunk = createAsyncThunk<void, IAlbumMutation>('albums/postAlbumThunk', async (album) => {
  const formData = new FormData();
  const keys = Object.keys(album) as (keyof IAlbumMutation)[];
  keys.forEach((key) => {
    const value = album[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });
  await axiosAPI.post('/albums', formData);
});
