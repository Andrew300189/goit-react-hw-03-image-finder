import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

const root = document.getElementById('root');
const rootRenderer = ReactDOM.createRoot(root);

rootRenderer.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);