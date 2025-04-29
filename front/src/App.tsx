import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists/Artists';
import { Container } from '@mui/material';

const App = () => {
  return (
    <>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
