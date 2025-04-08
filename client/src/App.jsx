import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArenaPage } from './pages/ArenaPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/arena" element={<ArenaPage />} />
    </Routes>
  );
}

export default App;
