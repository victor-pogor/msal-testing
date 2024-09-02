import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { User } from '@microsoft/microsoft-graph-types';
import { getUser, getUserPhoto } from '@/services/graph-api.service';

export const useProfileInfo = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [userData, setUserData] = useState<User | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!account) {
      return;
    }

    getUser(account)
      .then((response) => setUserData(response))
      .catch((error) => console.log(error));

    getUserPhoto(account)
      .then(async (response) => {
        const url = window.URL || window.webkitURL;
        setProfilePhoto(url.createObjectURL(response));
      })
      .catch((error) => console.log(error));

    return () => {
      if (profilePhoto) {
        URL.revokeObjectURL(profilePhoto);
      }

      setUserData(null);
      setProfilePhoto(null);
    };
  }, [account]);

  return { userData, profilePhoto } as const;
};
