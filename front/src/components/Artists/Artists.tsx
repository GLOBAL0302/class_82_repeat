import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAllArtists, selectAllArtistsError, selectAllArtistsLoading } from './artistsSlice';
import { getAllArtistsThunk } from './ArtistsThunk';
import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../GlobalConstants';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const artists = useAppSelector(selectAllArtists);
  const artistsLoading = useAppSelector(selectAllArtistsLoading);
  const artistsError = useAppSelector(selectAllArtistsError);

  console.log(artists);

  const getAllArtists = useCallback(() => {
    dispatch(getAllArtistsThunk());
  }, []);

  useEffect(() => {
    void getAllArtists();
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
                <Grid
                  sx={{
                    padding: 3,
                    border: '2px solid black',
                  }}
                  justifyContent="center"
                  container
                  flexDirection="column"
                  alignItems="center"
                  key={artist._id}
                  onClick={() => goToAlbum(artist._id)}
                >
                  <Grid>
                    <Typography variant="body1" component="p">
                      {artist.title}
                    </Typography>
                  </Grid>
                  <Grid sx={{ width: 300 }}>
                    <CardMedia component="img" image={artist.image ? apiUrl + '/' + artist.image : ''} height="300" />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Artists;
