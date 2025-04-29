import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { getAllAlbumsThunk } from './albumsThunks';
import { useSelector } from 'react-redux';
import { selectAllAlbums, selectAllAlbumsError, selectAllAlbumsLoading } from './albumsSlice';
import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../GlobalConstants';

const Albums = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const albums = useSelector(selectAllAlbums);
  const albumsLoading = useSelector(selectAllAlbumsLoading);
  const albumsError = useSelector(selectAllAlbumsError);

  const getAllAlbums = useCallback(async () => {
    if (id) await dispatch(getAllAlbumsThunk(id)).unwrap();
  }, []);

  useEffect(() => {
    void getAllAlbums();
  }, [id, getAllAlbums]);

  const goToTracksPage = (albumId: string) => {
    navigate(`/tracks/${albumId}`);
  };

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
              <Grid
                onClick={() => {
                  goToTracksPage(album._id);
                }}
                border={'1px solid black'}
                container
                flexDirection="column"
                alignItems="center"
                key={album._id}
              >
                <Grid sx={{ width: 200 }}>
                  <CardMedia component="img" image={album.image ? apiUrl + '/' + album.image : ''} height="300" />
                </Grid>
                <Grid>
                  <Typography variant="body1" component="p">
                    {album.title}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body1" component="p">
                    {album.created_at}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Albums;
