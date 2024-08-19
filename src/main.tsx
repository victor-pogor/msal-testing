import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { PublicClientApplication, EventType, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from './services/auth-config.service.ts';
import { App } from './app.component.tsx';

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
const activeAccount = msalInstance.getActiveAccount();
const allAccounts = msalInstance.getAllAccounts();
if (!activeAccount && allAccounts.length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(allAccounts[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const result: AuthenticationResult = event.payload as AuthenticationResult;
    msalInstance.setActiveAccount(result.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App instance={msalInstance} />
  </React.StrictMode>,
);
