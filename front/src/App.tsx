import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists/Artists';
import { Container, Typography } from '@mui/material';
import Albums from './components/Albums/Albums';
import Tracks from './components/Tracks/Tracks';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import TrackHistory from './components/TracksHistory/tracksHistory';

const App = () => {
  return (
    <>
      <header>
        <AppToolBar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/albums/:id" element={<Albums />} />
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
