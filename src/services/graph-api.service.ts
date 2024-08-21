import { AccountInfo, InteractionType } from '@azure/msal-browser';
import { AuthenticationProvider, Client } from '@microsoft/microsoft-graph-client';
import {
  AuthCodeMSALBrowserAuthenticationProviderOptions,
  AuthCodeMSALBrowserAuthenticationProvider,
} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { User } from '@microsoft/microsoft-graph-types';
import { msalInstance } from './msal-config.service';

export async function getUser(account: AccountInfo): Promise<User> {
  const fieldsToSelect: Array<keyof User> = ['displayName', 'givenName', 'surname'];
  return getOrCreateClient(account).api(graphConfig.meEndpoint).select(fieldsToSelect).get();
}

export async function getUserPhoto(account: AccountInfo): Promise<any> {
  return getOrCreateClient(account).api(graphConfig.mePhotoEndpoint).get();
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  meEndpoint: '/me',
  mePhotoEndpoint: '/me/photo/$value',
  meScopes: ['User.Read'],
};

let graphClient: Client | null;

const getOrCreateClient = (account: AccountInfo) => {
  const options: AuthCodeMSALBrowserAuthenticationProviderOptions = {
    account: account, // the AccountInfo instance to acquire the token for.
    interactionType: InteractionType.Redirect, // msal-browser InteractionType
    scopes: graphConfig.meScopes,
  };

  const authProvider: AuthenticationProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, options);
  graphClient ??= Client.initWithMiddleware({ authProvider });

  return graphClient;
};
