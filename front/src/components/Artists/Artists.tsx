import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllArtists, selectAllArtistsLoading } from './artistsSlice';
import { getAllArtistsThunk } from './ArtistsThunk';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../Users/usersSlice';
import Artist from './Artist';

const Artists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const artists = useAppSelector(selectAllArtists);
  const artistsLoading = useAppSelector(selectAllArtistsLoading);

  const getAllArtists = useCallback(() => {
    dispatch(getAllArtistsThunk());
  }, []);

  useEffect(() => {
    void getAllArtists();
    if (user?.role === 'admin') navigate('/admin');
  }, []);

  const goToAlbum = (albumId: string) => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <div>
      <Grid
        sx={{
          padding: 2,
          border: '2px dashed black',
        }}
      >
        <Grid container justifyContent="center">
          <Typography variant="h4" component="p">
            Artists
          </Typography>
        </Grid>
        <Grid container>
          {artistsLoading ? (
            <CircularProgress />
          ) : (
            <Grid container gap={2}>
              {artists.map((artist) => (
                <Grid key={artist._id}>{artist.isPublished && <Artist artist={artist}></Artist>}</Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Artists;
