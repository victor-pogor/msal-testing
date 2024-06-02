import { useProfileInfo } from './hooks/use-profile-info';

export const ProfileInfo = () => {
  const { account, graphData } = useProfileInfo();

  return (
    <div>
      <h5>Profile Information</h5>
      {account ? (
        <div>
          <p>Name: {account.name}</p>
          <p>Username: {account.username}</p>
          <p>Account ID: {account.localAccountId}</p>
          <p>First Name: {`${account.idTokenClaims?.given_name ?? 'N/A'}`}</p>
          <p>Last Name: {`${account.idTokenClaims?.family_name ?? 'N/A'}`}</p>
          <p>DisplayName (from Graph API call): {graphData?.displayName ?? 'N/A'}</p>
        </div>
      ) : null}
    </div>
  );
};
