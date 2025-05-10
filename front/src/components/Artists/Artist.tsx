import { CardMedia, Grid, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { IArtists } from '../../types';
import { apiUrl } from '../../GlobalConstants';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../Users/usersSlice';
interface Props {
  artist: IArtists;
}

const Artist: React.FC<PropsWithChildren<Props>> = ({ artist, children }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  return (
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
      onClick={() => navigate(`/albums/${artist._id}`)}
    >
      <Grid>
        <Typography variant="body1" component="p">
          {artist.title}
        </Typography>
      </Grid>
      <Grid sx={{ width: 300 }}>
        <CardMedia component="img" image={artist.image ? apiUrl + '/' + artist.image : ''} height="300" />
      </Grid>
      {user?.role === 'admin' && !artist.isPublished && (
        <Grid marginLeft="auto">
          <Typography color="error" sx={{ border: '1px solid black', padding: '2' }}>
            Not Published
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Artist;
