import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import to use createRoot
import './styles.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // Use createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
