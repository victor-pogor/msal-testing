import { AccountInfo, Configuration, JsonWebTokenTypes, PublicClientApplication } from '@azure/msal-browser';
import { ClientInfo, JoseHeader } from '@azure/msal-common';

export const mockTenantId = 'a07d97f2-f8e8-47d7-bb8a-58b1c19d1f5f'; // Random GUID
export const mockUserId = '10a291c7-333a-462e-8bd8-f86af69aa6f2'; // Random GUID
export const mockClientId = 'b58b67f2-7f24-493d-a986-f68476e304fc'; // Random GUID
export const defaultScopes = ['openid', 'profile', 'email'];

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

export const mockPublicClientApplication = new PublicClientApplication(mockMsalConfig);

export const jwtHeader: JoseHeader = {
  typ: JsonWebTokenTypes.Jwt,
  alg: 'RS256',
  kid: 'random-kid',
};

const genericTokenBody: AccountInfo['idTokenClaims'] = {
  given_name: 'Foo',
  family_name: 'Bar',
  name: 'Foo Bar',
  upn: 'foo.bar@example.com',
  oid: mockUserId,
  preferred_username: 'foo.bar@example.com',
  sub: 'fake_subject_of_the_information_in_the_token',
  tid: mockTenantId,
  ver: '2.0',
};

// ID token claims reference: https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference
export const mockIdTokenBody: AccountInfo['idTokenClaims'] = {
  ...genericTokenBody,
  aud: mockClientId,
  iss: `https://login.microsoftonline.com/${mockTenantId}/v2.0`,
  uti: 'fake_unique_id_token_identifier_claim',
};

// Access Token claims reference: https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference
export const mockAccessTokenBody: AccountInfo['idTokenClaims'] = {
  ...genericTokenBody,
  aud: `api://${mockClientId}`,
  iss: `https://sts.windows.net/${mockTenantId}/`,
  uti: 'fake_unique_access_token_identifier_claim',
};

export const clientInfoObj: ClientInfo = {
  uid: mockUserId,
  utid: mockTenantId,
};
