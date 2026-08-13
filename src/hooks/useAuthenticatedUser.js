import { useQuery } from '@apollo/client/react';

import { GET_ME } from '../graphql/queries';

const useAuthenticatedUser = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  return {
    user: data?.me,
    loading,
    error,
    refetch,
  };
};

export default useAuthenticatedUser;