import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Link from '@mui/material/Link';
import { IRegisterMutation } from '../../types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { register } from './usersThunks';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerLoading = useAppSelector(selectRegisterLoading);
  const registerError = useAppSelector(selectRegisterError);

  const [userForm, setUserForm] = useState<IRegisterMutation>({
    username: '',
    password: '',
  });

  const getFieldError = (fieldName: string) => {
    console.log(registerError);
    try {
      return registerError?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(userForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
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
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={registerLoading}
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="family-name"
              value={userForm.username}
              onChange={onInputChange}
              helperText={getFieldError('username')}
              error={Boolean(getFieldError('username'))}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={registerLoading}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={userForm.password}
              onChange={onInputChange}
              helperText={getFieldError('password')}
              error={Boolean(getFieldError('password'))}
            />
          </Grid>
        </Grid>
        <Button disabled={registerLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="space-between">
          <Grid sx={{ mx: 'auto' }}>
            <Link to="/login" variant="body2" component={RouterLink}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;
