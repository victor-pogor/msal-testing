import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { User } from '@microsoft/microsoft-graph-types';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { getUser, getUserPhoto } from '@/services/graph';
import { loginRequest } from '@/authConfig';

export const useProfileInfo = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [userData, setUserData] = useState<User | undefined>();
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>();

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(instance as PublicClientApplication, {
    account: instance.getActiveAccount()!,
    scopes: loginRequest.scopes,
    interactionType: InteractionType.Redirect,
  });

  useEffect(() => {
    if (!account) {
      return;
    }

    getUser(authProvider)
      .then((response) => setUserData(response))
      .catch((error) => console.log(error));

    getUserPhoto(authProvider)
      .then(async (response) => {
        const photoArrayBuffer = await response.arrayBuffer();
        const blob = new Blob([photoArrayBuffer], { type: 'image/jpeg' });
        const url = window.URL || window.webkitURL;
        setProfilePhoto(url.createObjectURL(blob));
      })
      .catch((error) => console.log(error));
  }, []);

  return { userData, profilePhoto } as const;
};
