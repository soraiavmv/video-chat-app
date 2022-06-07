import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextProvider from './util/network';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    </style>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
