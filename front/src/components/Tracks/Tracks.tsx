import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTracksThunk } from './tracksThunks';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { selectAllTracks, selectAllTracksLoading } from './tracksSlice';

const Tracks = () => {
  const { id } = useParams();
  const tracks = useAppSelector(selectAllTracks);
  const tracksLoading = useAppSelector(selectAllTracksLoading);
  const dispatch = useAppDispatch();

  const getAllTracks = useCallback(async () => {
    if (id) await dispatch(getAllTracksThunk(id));
  }, []);

  useEffect(() => {
    void getAllTracks();
  }, [id, getAllTracks]);
  return (
    <Grid>
      <Grid textAlign="center">
        <Typography>Artist: {tracks[0] && tracks[0].album.artist.title}</Typography>
        <Typography>Album: {tracks[0] && tracks[0].album.title}</Typography>
      </Grid>
      <Grid>
        {tracksLoading ? (
          <CircularProgress />
        ) : (
          <Grid>
            {tracks.map((track) => (
              <Grid
                key={track._id}
                marginBottom={2}
                container
                borderBottom="1px solid black"
                justifyContent={'space-between'}
              >
                <Grid width="30%">
                  <Typography>{track.title}</Typography>
                </Grid>
                <Grid>
                  <Typography>{track.track_number}</Typography>
                </Grid>
                <Grid>
                  <Typography>{track.duration}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Tracks;
