import { AccountInfo, AuthenticationScheme, ExternalTokenResponse, LoadTokenOptions, SilentRequest } from '@azure/msal-browser';
import { clientInfoObj, defaultScopes, jwtHeader, mockAccessTokenBody, mockIdTokenBody, mockMsalConfig } from '../mocks/mock-auth.config';

export const silentRequest = (scopes?: string[]): SilentRequest => ({
  scopes: scopes ?? defaultScopes,
  authority: mockMsalConfig.auth.authority,
});

export const serverResponse = (config?: ServerResponseConfig): ExternalTokenResponse => ({
  token_type: AuthenticationScheme.BEARER,
  scope: (config?.scopes ?? defaultScopes).join(' '),
  expires_in: 3599,
  id_token: createToken({ ...mockIdTokenBody, ...config?.idTokenClaims }),
  access_token: createToken({ ...mockAccessTokenBody, ...config?.accessTokenClaims }),
});

export const loadTokenOptions: LoadTokenOptions = {
  clientInfo: btoa(JSON.stringify(clientInfoObj)),
  extendedExpiresOn: 6599,
};

const createToken = (claims: AccountInfo['idTokenClaims']): string =>
  `${btoa(JSON.stringify(jwtHeader))}.${btoa(JSON.stringify(claims))}.${btoa('mock_signature')}`;

type ServerResponseConfig = {
  scopes?: string[];
  idTokenClaims?: AccountInfo['idTokenClaims'];
  accessTokenClaims?: AccountInfo['idTokenClaims'];
};
