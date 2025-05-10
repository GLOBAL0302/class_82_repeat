import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists/Artists';
import { Container, Typography } from '@mui/material';
import Albums from './components/Albums/Albums';
import Tracks from './components/Tracks/Tracks';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import TrackHistory from './components/TracksHistory/tracksHistory';
import AddArtist from './components/Artists/AddArtist';
import AddAlbums from './components/Albums/AddAlbums';
import AddTracks from './components/Tracks/AddTracks';
import { useAppSelector } from './store/hooks';
import { selectUser } from './components/Users/usersSlice';
import AdminArtists from './components/admin/artsits/AdminArtists';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolBar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/addArtist" element={<AddArtist />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute isAllowed={user?.role == 'admin'}>
                  <AdminArtists />
                </ProtectedRoute>
              }
            ></Route>

            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/addAlbums" element={<AddAlbums />} />

            <Route path="/AddTracks" element={<AddTracks />} />
            <Route path="/tracks/:id" element={<Tracks />} />
            <Route path="/trackHistory" element={<TrackHistory />} />
            <Route
              path="/*"
              element={
                <Typography variant="h4" component="h4">
                  Not Found page
                </Typography>
              }
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
