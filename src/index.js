import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from "./auth/AuthState";

import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
