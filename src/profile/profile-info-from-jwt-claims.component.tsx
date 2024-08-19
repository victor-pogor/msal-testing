import { ConditionalRender } from '../conditional-render.component';
import { useProfileInfo } from './profile-info.hook';

export const ProfileInfoFromJwtClaims = () => {
  const { account } = useProfileInfo();

  return (
    <div>
      <h5>Profile Information</h5>
      <ConditionalRender when={!!account}>
        <p data-testid="upn">UPN: {account!.idTokenClaims?.upn ?? 'N/A'}</p>
        <p data-testid="first-name">First Name: {`${account!.idTokenClaims?.given_name ?? 'N/A'}`}</p>
        <p data-testid="last-name">Last Name: {`${account!.idTokenClaims?.family_name ?? 'N/A'}`}</p>
      </ConditionalRender>
    </div>
  );
};
