import { render, screen, waitFor } from '@tests/utils/test-utils';
import { App } from './app.component';
import { PublicClientApplication } from '@azure/msal-browser';
import { mockMsalConfig } from '@tests/mocks/mock-auth.config';
import { silentRequest, serverResponse, loadTokenOptions } from '@tests/utils/mock-auth.service';

describe('Ensure that the app starts', () => {
  let pca: PublicClientApplication;
  let handleRedirectSpy: any;

  beforeEach(() => {
    pca = new PublicClientApplication(mockMsalConfig);
    const cache = pca.getTokenCache();
    cache.loadExternalTokens(silentRequest(), serverResponse(), loadTokenOptions);
    handleRedirectSpy = vi.spyOn(pca, 'handleRedirectPromise');
  });

  it('should instantiate msal', () => {
    expect(pca).toBeDefined();
    expect(pca).toBeInstanceOf(PublicClientApplication);
  });

  it('should render the app without crashing', async () => {
    render(<App instance={pca} />);
    await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledTimes(1));
    const text = await screen.findByText('Click on the Vite and React logos to learn more');
    expect(text).toBeInTheDocument();
  });
});
