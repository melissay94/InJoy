import { useQuery } from '@apollo/react-hooks'; 
import gql from 'graphql-tag';

const RANDOM_PROMPT = gql`
  query {
    randomPrompt {
      title
    }
  }
`;

const useRandomPrompt = () => {
  const { data, loading, error } = useQuery(RANDOM_PROMPT);

  return {
    data,
    loading,
    error,
  };
};

export default useRandomPrompt;
