import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDeIG8OUdrQ4Lpb5hdyYlQXFDKvPWesDkU",
  authDomain: "lastweeklyproject.firebaseapp.com",
  databaseURL: "https://lastweeklyproject-default-rtdb.firebaseio.com",
  projectId: "lastweeklyproject",
  storageBucket: "lastweeklyproject.appspot.com",
  messagingSenderId: "1021427333793",
  appId: "1:1021427333793:web:fc01dbff7a337bc1348ee0"
};

// Firebase 초기화
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
