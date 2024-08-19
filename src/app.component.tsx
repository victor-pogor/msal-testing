import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, MsalAuthenticationResult, MsalProvider } from '@azure/msal-react';
import { loginRequest } from './services/auth-config.service';
import { useState } from 'react';
import { ProfileInfoFromGraphApi } from './profile/profile-info-from-graph-api.component';

export const App = ({ instance }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <MsalProvider instance={instance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
        errorComponent={ErrorComponent}
        loadingComponent={LoadingComponent}
      >
        <ProfileInfoFromGraphApi />
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};

const ErrorComponent = ({ error }: MsalAuthenticationResult) => {
  return <p>An Error Occurred: {error?.message}</p>;
};

const LoadingComponent = () => {
  return <p>Authentication in progress...</p>;
};

type Props = {
  instance: PublicClientApplication;
};