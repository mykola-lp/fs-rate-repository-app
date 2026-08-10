import { useContext } from 'react';
import { useMutation } from '@apollo/client/react';

import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    const accessToken = response.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;