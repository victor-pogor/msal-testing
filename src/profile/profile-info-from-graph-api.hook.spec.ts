import { MockAuthentication, mockPublicClientApplication, renderHook, waitFor } from '@tests/utils/test-utils';
import { useProfileInfo } from './profile-info-from-graph-api.hook';
import * as graphApiService from '@/services/graph-api.service';

let handleRedirectSpy: any;
let getUserSpy: any;
let getUserPhotoSpy: any;

beforeEach(() => {
  handleRedirectSpy = vi.spyOn(mockPublicClientApplication, 'handleRedirectPromise');
  getUserSpy = vi.spyOn(graphApiService, 'getUser');
  getUserPhotoSpy = vi.spyOn(graphApiService, 'getUserPhoto');
});

afterEach(() => {
  vi.clearAllMocks();
});

it('assign null to userData if user is not authenticated', async () => {
  const { result } = renderHook(() => useProfileInfo(), { wrapper: MockAuthentication });

  await waitFor(() => expect(handleRedirectSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserSpy).not.toHaveBeenCalled());
  await waitFor(() => expect(getUserPhotoSpy).not.toHaveBeenCalled());

  expect(result.current.userData).toBeNull();
});
