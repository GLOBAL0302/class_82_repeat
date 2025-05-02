import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTracksHistoryThunk } from './tracksHistoryThunks';
import { selectAllTrackHistoryLoading, selectAllTracksHistory } from './tracksHistorySlice';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { selectUser } from '../Users/usersSlice';
import { useNavigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const tracksHistory = useAppSelector(selectAllTracksHistory);
  const trackHistoryLoading = useAppSelector(selectAllTrackHistoryLoading);

  if (!user) navigate('/register');

  const getAllTracks = useCallback(async () => {
    await dispatch(getAllTracksHistoryThunk());
  }, []);

  useEffect(() => {
    void getAllTracks();
  }, [dispatch, getAllTracks]);
  return (
    <div>
      {trackHistoryLoading ? (
        <CircularProgress />
      ) : (
        <>
          {tracksHistory.map((trackHistory) => (
            <Grid
              alignItems="center"
              padding={1}
              key={trackHistory._id}
              marginBottom={2}
              container
              borderBottom="1px solid black"
              justifyContent={'space-between'}
            >
              <Grid width="30%">
                <Typography>{trackHistory.dateTime}</Typography>
              </Grid>
              <Grid>
                <Typography>{trackHistory.track.title}</Typography>
              </Grid>
              <Grid>
                <Typography>{trackHistory.track.album.artist.title}</Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </div>
  );
};

export default TrackHistory;
