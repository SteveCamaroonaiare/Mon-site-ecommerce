
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';

function App() {
  const location = useLocation();

  // Vérifie si l'URL correspond à la page d'accueil
  const isHomePage = location.pathname === '/';

  return (
    <div style={{ overflowY: 'hidden', display: 'flex' }}>
      {/* Afficher Menu uniquement sur la page d'accueil */}
      {isHomePage && <Menu />}

      {/* L'outlet pour afficher les autres composants */}
      <Outlet />
    </div>
  );
}

export default App;

