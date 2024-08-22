import { ConditionalRender } from '../conditional-render.component';
import { useProfileInfo } from './profile-info-from-graph-api.hook';

export const ProfileInfoFromGraphApi = () => {
  const { userData, profilePhoto } = useProfileInfo();

  return (
    <div>
      <h5>Profile Information</h5>
      <ConditionalRender when={!!profilePhoto} otherwise={<p data-testid="not-authenticated">Not Authenticated</p>}>
        <img src={profilePhoto ?? '#'} alt={userData?.displayName ?? 'User Photo'} data-testid="phofile-photo" />
      </ConditionalRender>
      <ConditionalRender when={!!userData} otherwise={<p data-testid="not-authenticated">Not Authenticated</p>}>
        <p data-testid="upn">UPN: {userData?.userPrincipalName}</p>
        <p data-testid="first-name">First Name: {userData?.givenName}</p>
        <p data-testid="last-name">Last Name: {userData?.surname}</p>
      </ConditionalRender>
    </div>
  );
};
