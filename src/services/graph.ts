import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { User } from '@microsoft/microsoft-graph-types';

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export async function getUser(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<User> {
  ensureClient(authProvider);
  return graphClient!.api('/me').select('displayName,givenName,surname').get();
}

export async function getUserPhoto(authProvider: AuthCodeMSALBrowserAuthenticationProvider): Promise<any> {
  ensureClient(authProvider);
  return graphClient!.api('/me/photo/$value').get();
}
