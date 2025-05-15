import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosAPI from '../../axiosApi';
import { IGlobalError, ILoginMutation, IRegisterMutation, IUser, IValidationError } from '../../types';

import { logOutReducer } from './usersSlice';

export interface RegisterAndLoadingResponse {
  user: IUser;
  message: string;
}

export const googleLogin = createAsyncThunk<IUser, string, { rejectValue: IGlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post<RegisterAndLoadingResponse>('/users/google', { credential });
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const register = createAsyncThunk<
  RegisterAndLoadingResponse,
  IRegisterMutation,
  { rejectValue: IValidationError }
>('users/register', async (registerForm, { rejectWithValue }) => {
  try {
    const { data } = await axiosAPI.post<RegisterAndLoadingResponse>('/users', registerForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const login = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'users/login',
  async (loginForm, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post<RegisterAndLoadingResponse>('/users/sessions', loginForm);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const logOutThunk = createAsyncThunk<void, void>('user/logOut', async (_arg, { dispatch }) => {
  await axiosAPI.delete('/users/sessions', { withCredentials: true });
  dispatch(logOutReducer());
});
