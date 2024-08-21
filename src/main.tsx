import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { App } from './app.component.tsx';
import { msalInstance } from './services/msal-config.service.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>,
);
