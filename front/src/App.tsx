import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists/Artists';
import { Container } from '@mui/material';
import Albums from './components/Albums/Albums';

const App = () => {
  return (
    <>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
