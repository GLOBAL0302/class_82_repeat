import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTrackToHistoryThunk, getAllTracksThunk } from './tracksThunks';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { selectAllTracks, selectAllTracksLoading } from './tracksSlice';
import { selectUser } from '../Users/usersSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Tracks = () => {
  const { id } = useParams();
  const tracks = useAppSelector(selectAllTracks);
  const tracksLoading = useAppSelector(selectAllTracksLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

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
                alignItems="center"
                padding={1}
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
                {user && (
                  <Grid>
                    <Button
                      onClick={() => dispatch(addTrackToHistoryThunk({ token: user.token, trackId: track._id }))}
                      color="warning"
                      sx={{ border: '1px solid black' }}
                      endIcon={<PlayCircleOutlineIcon />}
                    >
                      Play
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Tracks;
