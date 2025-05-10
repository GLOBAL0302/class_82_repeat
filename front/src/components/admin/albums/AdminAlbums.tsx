import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAllAlbums, selectAllAlbumsLoading } from '../../Albums/albumsSlice';
import { selectUser } from '../../Users/usersSlice';
import { getAllAlbumsThunk } from '../../Albums/albumsThunks';
import Album from '../../Albums/Album';

const AdminAlbums = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const albums = useSelector(selectAllAlbums);
  const albumsLoading = useSelector(selectAllAlbumsLoading);
  const user = useAppSelector(selectUser);

  const getAllAlbums = useCallback(async () => {
    if (id) await dispatch(getAllAlbumsThunk(id)).unwrap();
  }, []);

  useEffect(() => {
    void getAllAlbums();
  }, [id, getAllAlbums]);

  return (
    <Grid
      sx={{
        padding: 5,
        border: '3px solid black',
      }}
    >
      <Grid>
        <Typography variant="h5" component="h5" textAlign="center">
          {albums[0] && albums[0].artist.title}
        </Typography>
      </Grid>

      <Grid>
        {albumsLoading ? (
          <CircularProgress />
        ) : (
          <Grid container gap={2}>
            {albums.map((album) => (
              <Grid key={album._id}>
                <Album album={album} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminAlbums;
