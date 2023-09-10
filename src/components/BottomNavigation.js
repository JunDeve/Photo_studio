// BottomNavigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const BottomNavigation = () => {
  return (
    <div className="bottom-navigation">
      <Link to="/">홈</Link>
      <Link to="/board">게시판</Link>
      <Link to="/contact">문의</Link>
    </div>
  );
};

export default BottomNavigation;
