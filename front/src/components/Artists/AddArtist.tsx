import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import FileInput from '../UI/FileInput/FileInput';
import { useAppDispatch } from '../../store/hooks';
import { postArtistThunk } from './ArtistsThunk';
import { IArtistsMutation } from '../../types';

const initialState = {
  title: '',
  image: null,
  description: '',
};

const AddArtist = () => {
  const [artistMutation, setArtistMutation] = useState<IArtistsMutation>(initialState);

  const dispatch = useAppDispatch();

  const onChangeArtistMutation = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArtistMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitAddArtist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(postArtistThunk(artistMutation)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setArtistMutation((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <Grid component={'form'} container flexDirection="column" gap={4} onSubmit={onSubmitAddArtist}>
      <Grid>
        <TextField
          required
          onChange={onChangeArtistMutation}
          fullWidth
          placeholder="title"
          variant="filled"
          id="title"
          name="title"
        />
      </Grid>
      <Grid>
        <TextField
          required
          onChange={onChangeArtistMutation}
          fullWidth
          placeholder="description"
          variant="filled"
          id="description"
          name="description"
        />
      </Grid>
      <FileInput label="image" name="image" onGetFile={onChangeFile} />
      <Grid textAlign="right">
        <Button type="submit" variant="contained" color="primary">
          Add Artist
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddArtist;
