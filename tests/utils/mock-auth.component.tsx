import { MsalProvider } from '@azure/msal-react';
import { mockPublicClientApplication } from '../mocks/mock-auth.config';
import { PropsWithChildren } from 'react';

export const MockAuthentication = ({ children }: PropsWithChildren) => {
  const activeAccount = mockPublicClientApplication.getActiveAccount();
  const allAccounts = mockPublicClientApplication.getAllAccounts();

  if (!activeAccount && allAccounts.length > 0) {
    mockPublicClientApplication.setActiveAccount(allAccounts[0]);
  }

  return <MsalProvider instance={mockPublicClientApplication}>{children}</MsalProvider>;
};
