import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
  <App />
);



