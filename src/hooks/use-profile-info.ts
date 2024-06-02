import { loginRequest } from '@/authConfig';
import { SilentRequest } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

export const useProfileInfo = () => {
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  const [graphData, setGraphData] = useState<unknown | null>(null);

  useEffect(() => {
    if (account) {
      callGraph();
    }
  }, []);

  const callGraph = async () => {
    if (!account) {
      return;
    }

    const request: SilentRequest = {
      ...loginRequest,
      account: account,
    };

    const response = await instance.acquireTokenSilent(request);

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append('Authorization', bearer);

    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch('https://graph.microsoft.com/v1.0/me', options)
      .then((response) => response.json())
      .then((response) => setGraphData(response))
      .catch((error) => console.log(error));
  };

  return { account, callGraph, graphData } as const;
};
