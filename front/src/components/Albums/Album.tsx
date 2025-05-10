import { CardMedia, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../GlobalConstants';
import { IAlbums } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  album: IAlbums;
}

const Album: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();
  return (
    <Grid
      onClick={() => {
        navigate(`/tracks/${album._id}`);
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
  );
};

export default Album;
