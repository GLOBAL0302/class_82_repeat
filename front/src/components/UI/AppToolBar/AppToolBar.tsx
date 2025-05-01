import { AppBar, Container, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../Users/usersSlice';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ background: 'purple' }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">CompStore</Link>
            </Typography>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
