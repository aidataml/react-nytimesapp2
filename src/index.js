import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileHandler from './contexts/ProfileHandler'; 
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FavoritesHandler } from './contexts/FavoritesContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <ProfileHandler>
      <FavoritesHandler>
        <App />
      </FavoritesHandler>
    </ProfileHandler>
  </Router>
);