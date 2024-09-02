import { renderHook, waitFor } from '@tests/utils/test-utils';
import { useProfileInfo } from './profile-info-from-graph-api.hook';
import * as graphApiService from '@/services/graph-api.service';
import { User } from '@microsoft/microsoft-graph-types';
import { loadTokenOptions, serverResponse, silentRequest } from '@tests/utils/mock-auth.service';
import { mockPublicClientApplication } from '@tests/mocks/mock-auth.config';
import { MockAuthentication } from '@tests/utils/mock-auth.component';

let handleRedirectSpy: any;
let getUserSpy: any;
let getUserPhotoSpy: any;

vi.mock('@/services/graph-api.service');

beforeEach(() => {
  handleRedirectSpy = vi.spyOn(mockPublicClientApplication, 'handleRedirectPromise');
  getUserSpy = vi.spyOn(graphApiService, 'getUser');
  getUserPhotoSpy = vi.spyOn(graphApiService, 'getUserPhoto');
});

it('assign null to userData if user is not authenticated', async () => {
  const { result } = renderHook(() => useProfileInfo(), { wrapper: MockAuthentication });

  await waitFor(() => expect(handleRedirectSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserPhotoSpy).not.toHaveBeenCalled());

  expect(result.current.userData).toBeNull();
});

it('assign null to profilePhoto if user is not authenticated', async () => {
  const { result } = renderHook(() => useProfileInfo(), { wrapper: MockAuthentication });

  await waitFor(() => expect(handleRedirectSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserPhotoSpy).not.toHaveBeenCalled());

  expect(result.current.profilePhoto).toBeNull();
});

it('should return userData if user is authenticated', async () => {
  const user: User = { displayName: 'John Doe', givenName: 'John', surname: 'Doe' };
  getUserSpy.mockResolvedValue(user);
  getUserPhotoSpy.mockResolvedValue(new Blob());

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), serverResponse(), loadTokenOptions);

  const { result } = renderHook(() => useProfileInfo(), { wrapper: MockAuthentication });

  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());
  await waitFor(() => expect(getUserSpy).toHaveBeenCalledOnce());

  expect(result.current.userData).toEqual(user);
});

it('should return profilePhoto if user is authenticated', async () => {
  const expectedPhoto = 'blob:';
  const photoBlob = new Blob(['img_blob'], { type: 'image/png' });
  getUserPhotoSpy.mockResolvedValue(photoBlob);

  const cache = mockPublicClientApplication.getTokenCache();
  cache.loadExternalTokens(silentRequest(), serverResponse(), loadTokenOptions);

  const { result } = renderHook(() => useProfileInfo(), { wrapper: MockAuthentication });

  await waitFor(() => expect(handleRedirectSpy).toHaveBeenCalledOnce());
  await waitFor(() => expect(getUserPhotoSpy).toHaveBeenCalledOnce());

  expect(result.current.profilePhoto).toContain(expectedPhoto);
});
