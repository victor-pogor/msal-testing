import { useProfileInfo } from './hooks/use-profile-info';

export const ProfileInfo = () => {
  const { userData, profilePhoto } = useProfileInfo();

  return (
    <div>
      <h5>Profile Information</h5>
      {profilePhoto ? <img src={profilePhoto} alt={userData?.displayName ?? 'User Photo'} /> : null}
      {userData ? (
        <div>
          <p>Name: {userData.displayName}</p>
          <p>First Name: {userData.givenName}</p>
          <p>Last Name: {userData.surname}</p>
        </div>
      ) : null}
    </div>
  );
};
