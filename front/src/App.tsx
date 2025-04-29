import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists/Artists';
import { Container } from '@mui/material';
import Albums from './components/Albums/Albums';
import Tracks from './components/Tracks/Tracks';

const App = () => {
  return (
    <>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/tracks/:id" element={<Tracks />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
