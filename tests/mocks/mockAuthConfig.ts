import { AuthenticationScheme, Configuration, ExternalTokenResponse, JsonWebTokenTypes, LoadTokenOptions, SilentRequest } from '@azure/msal-browser';
import { ClientInfo, TokenClaims, JoseHeader } from '@azure/msal-common';

export const mockTenantId = 'a07d97f2-f8e8-47d7-bb8a-58b1c19d1f5f'; // Random GUID
export const mockUserId = '10a291c7-333a-462e-8bd8-f86af69aa6f2'; // Random GUID
export const mockClientId = 'b58b67f2-7f24-493d-a986-f68476e304fc'; // Random GUID

export const mockMsalConfig: Configuration = {
  auth: {
    clientId: mockClientId,
    authority: `https://login.microsoftonline.com/${mockTenantId}`,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const jwtHeader: JoseHeader = {
  typ: JsonWebTokenTypes.Jwt,
  alg: 'RS256',
  kid: 'random-kid',
};

// ID token claims reference: https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference
const mockIdTokenBody: ExtendedTokenClaims = {
  aud: mockClientId,
  iss: `https://login.microsoftonline.com/${mockTenantId}/v2.0`,
  given_name: 'Foo',
  family_name: 'Bar',
  name: 'Foo Bar',
  oid: mockUserId,
  preferred_username: 'foo.bar@example.com',
  sub: 'fake_subject_of_the_information_in_the_token',
  tid: mockTenantId,
  uti: 'fake_unique_token_identifier_claim',
  ver: '2.0',
};

// Access Token claims reference: https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference
const mockAccessTokenBody: ExtendedTokenClaims = {
  aud: `api://${mockClientId}`,
  iss: `https://sts.windows.net/${mockTenantId}/`,
  given_name: 'Foo',
  family_name: 'Bar',
  name: 'Foo Bar',
  unique_name: 'foo.bar@example.com',
  upn: 'foo.bar@example.com',
  oid: mockUserId,
  sub: 'fake_subject_of_the_information_in_the_token',
  tid: mockTenantId,
  ver: '2.0',
};

export const clientInfoObj: ClientInfo = {
  uid: mockUserId,
  utid: mockTenantId,
};

export const silentRequest: SilentRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
  authority: mockMsalConfig.auth.authority,
};

export const serverResponse: ExternalTokenResponse = {
  token_type: AuthenticationScheme.BEARER,
  scope: silentRequest.scopes.join(' '),
  expires_in: 3599,
  id_token: `${btoa(JSON.stringify(jwtHeader))}.${btoa(JSON.stringify(mockIdTokenBody))}.${btoa('mock_signature')}`,
  access_token: `${btoa(JSON.stringify(jwtHeader))}.${btoa(JSON.stringify(mockAccessTokenBody))}.${btoa('mock_signature')}`,
};

export const loadTokenOptions: LoadTokenOptions = {
  clientInfo: btoa(JSON.stringify(clientInfoObj)),
  extendedExpiresOn: 6599,
};

type ExtendedTokenClaims = TokenClaims & { [key: string]: string | undefined };
