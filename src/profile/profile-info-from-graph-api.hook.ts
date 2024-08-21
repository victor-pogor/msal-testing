import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { User } from '@microsoft/microsoft-graph-types';
import { getUser, getUserPhoto } from '@/services/graph-api.service';

export const useProfileInfo = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [userData, setUserData] = useState<User | undefined>();
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>();

  useEffect(() => {
    if (!account) {
      return;
    }

    getUser(account)
      .then((response) => setUserData(response))
      .catch((error) => console.log(error));

    getUserPhoto(account)
      .then(async (response) => {
        const photoArrayBuffer = await response.arrayBuffer();
        const blob = new Blob([photoArrayBuffer], { type: 'image/jpeg' });
        const url = window.URL || window.webkitURL;
        setProfilePhoto(url.createObjectURL(blob));
      })
      .catch((error) => console.log(error));
  }, []);

  return { userData, profilePhoto, account } as const;
};
