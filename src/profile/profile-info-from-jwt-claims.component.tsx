import { useMsal } from '@azure/msal-react';
import { ConditionalRender } from '../components/conditional-render.component';

export const ProfileInfoFromJwtClaims = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();

  return (
    <div>
      <h5>Profile Information</h5>
      <ConditionalRender when={!!account} otherwise={<p data-testid="not-authenticated">Not Authenticated</p>}>
        <p data-testid="upn">UPN: {account?.idTokenClaims?.upn ?? 'N/A'}</p>
        <p data-testid="first-name">First Name: {`${account?.idTokenClaims?.given_name ?? 'N/A'}`}</p>
        <p data-testid="last-name">Last Name: {`${account?.idTokenClaims?.family_name ?? 'N/A'}`}</p>
      </ConditionalRender>
    </div>
  );
};
