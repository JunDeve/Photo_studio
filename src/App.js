// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import ContactPage from './pages/ContactPage';
import BottomNavigation from './components/BottomNavigation';
import './components/BottomNavigation.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <BottomNavigation />
      </div>
    </Router>
  );
};

export default App;
