import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTrackToHistoryThunk, getAllTracksThunk } from './tracksThunks';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { selectAllTracks, selectAllTracksLoading } from './tracksSlice';
import { selectUser } from '../Users/usersSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Track from './Track';

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
              <Grid key={track._id}>{track.isPublished && <Track track={track} />}</Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Tracks;
