import LoginIcon from '@mui/icons-material/Login';
import { Alert, Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ILoginMutation } from '../../types';
import { selectLoginError, selectLoginLoading } from './usersSlice';
import { googleLogin, login } from './usersThunks';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);

  const [userForm, setUserForm] = useState<ILoginMutation>({
    username: '',
    password: '',
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(userForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(error);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LoginIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      {error && <Alert severity="error">{error.error}</Alert>}

      <Box sx={{ pt: 2 }}>
        <GoogleLogin
          onSuccess={(credentialsResponse) => {
            if (credentialsResponse.credential) {
              void googleLoginHandler(credentialsResponse.credential);
            }
          }}
        ></GoogleLogin>
      </Box>

      <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={loginLoading}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="family-name"
              value={userForm.username}
              onChange={onInputChange}
              error={Boolean(error)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={loginLoading}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={userForm.password}
              onChange={onInputChange}
              error={Boolean(error)}
            />
          </Grid>
        </Grid>
        <Button disabled={loginLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container justifyContent="space-between">
          <Grid sx={{ mx: 'auto' }}>
            <Link to="/register" variant="body2" component={RouterLink}>
              Don't have an account, yet? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
