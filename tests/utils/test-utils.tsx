import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { render } from '@testing-library/react';
import { mockMsalConfig } from '@tests/mocks/mock-auth.config';
import { PropsWithChildren } from 'react';

export const mockPublicClientApplication = new PublicClientApplication(mockMsalConfig);

function customRender(ui: React.ReactElement, options: Parameters<typeof render>[1] = {}) {
  return render(ui, {
    wrapper: ({ children }) => <MockAuthentication>{children}</MockAuthentication>,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };

const MockAuthentication = ({ children }: PropsWithChildren) => {
  const activeAccount = mockPublicClientApplication.getActiveAccount();
  const allAccounts = mockPublicClientApplication.getAllAccounts();

  if (!activeAccount && allAccounts.length > 0) {
    mockPublicClientApplication.setActiveAccount(allAccounts[0]);
  }

  return <MsalProvider instance={mockPublicClientApplication}>{children}</MsalProvider>;
};
