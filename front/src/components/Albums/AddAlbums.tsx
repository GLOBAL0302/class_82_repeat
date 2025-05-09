import { arEG } from '@mui/material/locale';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllArtists } from '../Artists/artistsSlice';
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { IAlbumMutation } from '../../types';
import FileInput from '../UI/FileInput/FileInput';
import { postAlbumThunk } from './albumsThunks';

const initialState = {
  title: '',
  artist: '',
  created_at: '',
  image: null,
};

const AddAlbums = () => {
  const [albumsMutation, setAlbumsMutation] = useState<IAlbumMutation>(initialState);
  const artists = useAppSelector(selectAllArtists);
  const dispatch = useAppDispatch();

  const handleChangeAlbumMutation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setAlbumsMutation({
      ...albumsMutation,
      [name]: value,
    });
  };

  const OnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setAlbumsMutation((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmitAlbumMutation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(postAlbumThunk(albumsMutation)).unwrap();
    } catch (e) {
      console.error(e);
    }
    console.log(albumsMutation);
  };
  return (
    <Grid container flexDirection={'column'} gap={2} component="form" onSubmit={onSubmitAlbumMutation}>
      <Grid>
        <TextField
          fullWidth
          placeholder="Title"
          variant="filled"
          name="title"
          id="title"
          value={albumsMutation.title}
          onChange={handleChangeAlbumMutation}
        />
      </Grid>
      <Grid>
        <InputLabel id="artist">Artist</InputLabel>
        <Select
          id="artist"
          name="artist"
          label="artist"
          onChange={handleChangeAlbumMutation}
          value={albumsMutation.artist}
          fullWidth
        >
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.title}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid>
        <TextField
          fullWidth
          placeholder="Created at"
          name="created_at"
          id="created_at"
          variant="filled"
          value={albumsMutation.created_at}
          onChange={handleChangeAlbumMutation}
        />
      </Grid>

      <Grid>
        <FileInput name="image" label="image" onGetFile={OnChangeFile} />
      </Grid>
      <Grid>
        <Button variant="contained" type="submit" color="primary">
          Add Album
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddAlbums;
