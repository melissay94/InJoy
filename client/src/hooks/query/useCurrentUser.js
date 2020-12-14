import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      name
      email
    }
  }
`;

const useCurrentUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  return { data, loading, error };
};

export default useCurrentUser;
