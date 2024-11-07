import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* This ensures all routes are within a Router context */}
    <App />
  </BrowserRouter>
);

