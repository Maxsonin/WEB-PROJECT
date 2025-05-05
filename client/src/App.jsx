import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import { AuthProvider } from './contexts/AuthContext/AuthContext';

const LazyHome = React.lazy(() => import('./pages/HomePage/HomePage'));
const LazyArena = React.lazy(() => import('./pages/ArenaPage/ArenaPage'));
const LazyAbout = React.lazy(() => import('./pages/AboutPage/AboutPage'));

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/arena" element={<LazyArena />} />
          <Route path="/about" element={<LazyAbout />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
