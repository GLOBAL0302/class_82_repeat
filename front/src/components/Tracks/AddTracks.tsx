import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllArtists } from '../Artists/artistsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ITracksMutation } from '../../types';
import { selectAllAlbums } from '../Albums/albumsSlice';
import { getAllAlbumsThunk } from '../Albums/albumsThunks';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { PostTrack } from './tracksThunks';
import { getAllArtistsThunk } from '../Artists/ArtistsThunk';

const initialState = {
  album: '',
  title: '',
  duration: '00:00',
};

const AddTracks = () => {
  const [artistSelector, setArtistSelector] = useState('');
  const [trackMutation, setTrackMutation] = useState<ITracksMutation>(initialState);
  const artists = useSelector(selectAllArtists);
  const albums = useAppSelector(selectAllAlbums);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllAlbumsThunk(artistSelector));
  }, [artistSelector]);

  const onChangeHandleArtistSelector = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setArtistSelector(e.target.value);
  };

  const onChangeTrackMutation = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTrackMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(PostTrack(trackMutation)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container flexDirection="column" gap={5} component="form" onSubmit={onSubmitForm}>
      <Grid>
        <TextField
          fullWidth
          id="title"
          name="title"
          onChange={onChangeTrackMutation}
          placeholder="Title"
          value={trackMutation.title}
          variant="filled"
        />
      </Grid>
      <Grid>
        <InputLabel id="artist">Artist</InputLabel>
        <Select
          id="artist"
          name="artist"
          label="artist"
          onChange={onChangeHandleArtistSelector}
          value={artistSelector}
          fullWidth
        >
          {artists.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>
              {artist.title}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {albums && artistSelector && (
        <Grid>
          <InputLabel id="albums">albums</InputLabel>
          <Select
            id="album"
            name="album"
            label="album"
            onChange={onChangeTrackMutation}
            value={trackMutation.album}
            fullWidth
          >
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      )}
      <Grid>
        <TextField
          fullWidth
          id="duration"
          name="duration"
          onChange={onChangeTrackMutation}
          placeholder="Duration"
          value={trackMutation.duration}
          variant="filled"
        />
      </Grid>
      <Grid>
        <Button type="submit" variant="contained" color="primary">
          Add Track
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTracks;
