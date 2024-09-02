import { render, waitFor } from '@tests/utils/test-utils';
import { ProfileInfoFromJwtClaims } from './profile-info-from-jwt-claims.component';
import { silentRequest, serverResponse, loadTokenOptions } from '@tests/utils/mock-auth.service';
import { mockPublicClientApplication } from '@tests/mocks/mock-auth.config';

let handleRedirectSpy: any;

beforeEach(() => {
  handleRedirectSpy = vi.spyOn(mockPublicClientApplication, 'handleRedirectPromise');
});

it('does not render the UPN if user is not authenticated', async () => {
  const { queryByTestId } = render(<ProfileInfoFromJwtClaims />, { wrapper: ({ children }) => children });
  expect(queryByTestId('upn')).not.toBeInTheDocument();
  expect(queryByTestId('not-authenticated')).toHaveTextContent('Not Authenticated');
});

it('does not render the UPN if user is not authenticated', async () => {
  const upn = undefined;
  const expected = 'UPN: N/A';

  const msalResponse = serverResponse({ idTokenClaims: { upn } }); // override the default upn claim in id token

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), msalResponse, loadTokenOptions);

  const { findByTestId } = render(<ProfileInfoFromJwtClaims />);
  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());

  const upnElement = await findByTestId('upn');
  expect(upnElement).toHaveTextContent(expected);
});

it('renders the UPN if it exists in id token claims', async () => {
  const upn = 'foo.bar@example.com';
  const expected = 'UPN: foo.bar@example.com';

  const msalResponse = serverResponse({ idTokenClaims: { upn } }); // override the default upn claim in id token

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), msalResponse, loadTokenOptions);

  const { findByTestId } = render(<ProfileInfoFromJwtClaims />);
  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());

  const upnElement = await findByTestId('upn');
  expect(upnElement).toHaveTextContent(expected);
});

it('does not render the first name if user is not authenticated', async () => {
  const { queryByTestId } = render(<ProfileInfoFromJwtClaims />, { wrapper: ({ children }) => children });
  expect(queryByTestId('first-name')).not.toBeInTheDocument();
  expect(queryByTestId('not-authenticated')).toHaveTextContent('Not Authenticated');
});

it('does not render the first name if it does not exist in id token claims', async () => {
  const givenName = undefined;
  const expected = 'First Name: N/A';

  const msalResponse = serverResponse({ idTokenClaims: { given_name: givenName } }); // override the default given_name claim in id token

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), msalResponse, loadTokenOptions);

  const { findByTestId } = render(<ProfileInfoFromJwtClaims />);
  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());

  const firstNameElement = await findByTestId('first-name');
  expect(firstNameElement).toHaveTextContent(expected);
});

it('renders the first name if it exists in id token claims', async () => {
  const givenName = 'Foo';
  const expected = 'First Name: Foo';

  const msalResponse = serverResponse({ idTokenClaims: { given_name: givenName } }); // override the default given_name claim in id token

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), msalResponse, loadTokenOptions);

  const { findByTestId } = render(<ProfileInfoFromJwtClaims />);
  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());

  const firstNameElement = await findByTestId('first-name');
  expect(firstNameElement).toHaveTextContent(expected);
});

it('does not render the last name if user is not authenticated', async () => {
  const { queryByTestId } = render(<ProfileInfoFromJwtClaims />, { wrapper: ({ children }) => children });
  expect(queryByTestId('last-name')).not.toBeInTheDocument();
  expect(queryByTestId('not-authenticated')).toHaveTextContent('Not Authenticated');
});

it('does not render the last name if it does not exist in id token claims', async () => {
  const familyName = undefined;
  const expected = 'Last Name: N/A';

  const msalResponse = serverResponse({ idTokenClaims: { family_name: familyName } }); // override the default family_name claim in id token

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), msalResponse, loadTokenOptions);

  const { findByTestId } = render(<ProfileInfoFromJwtClaims />);
  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());

  const lastNameElement = await findByTestId('last-name');
  expect(lastNameElement).toHaveTextContent(expected);
});
