import { Routes, Route } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';

import { HomePage } from './pages/HomePage/HomePage';
import { ArenaPage } from './pages/ArenaPage/ArenaPage';
import { AboutPage } from './pages/AboutPage/AboutPage';

import { AuthProvider } from './contexts/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arena" element={<ArenaPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
