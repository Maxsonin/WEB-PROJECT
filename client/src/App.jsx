import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArenaPage } from './pages/ArenaPage';
import { NavBar } from './components/NavBar/NavBar';
import { AuthProvider } from './contexts/AuthContext/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arena" element={<ArenaPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
