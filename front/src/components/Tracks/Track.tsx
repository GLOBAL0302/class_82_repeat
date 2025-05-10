import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { ITracks } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { selectUser } from '../Users/usersSlice';
import { addTrackToHistoryThunk } from './tracksThunks';

interface Props {
  track: ITracks;
}

const Track: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
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
  );
};

export default Track;
