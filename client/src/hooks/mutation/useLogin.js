import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'; 
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user {
        username,
        id
      }
    }
  }
`;

const useLogin = client => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [login, { data, loading }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      localStorage.setItem('name', login.user.username);
      localStorage.setItem('id', login.user.id);

      client.writeQuery({
        query: gql`
          query getLoggedIn { isLoggedIn }
        `,
        data: { isLoggedIn: true }
      });
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors.length > 0) {
        setMessage(graphQLErrors[0].message);
      } else if (networkError) {
        setMessage(networkError.message || 'Network Error');
      } else {
        setMessage('There was an error logging into your account');
      }
    }
  });

  const handleEmailChange = e => {
    e.persist();
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    e.persist();
    setPassword(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { email, password }});
  }

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleSubmit,
    data,
    loading,
    message,
  }
}

export default useLogin;
