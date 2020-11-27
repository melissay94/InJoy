import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'; 
import gql from 'graphql-tag';

const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!, $name: String) {
    signup(username: $username, email: $email, password: $password, name: $name){
      token
      user {
        username,
        id
      }
    }
  }
`;

const useSignup = client => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const [signup, { data, loading }] = useMutation(SIGNUP_USER, {
    onCompleted({ signup }) {
      localStorage.setItem('token', signup.token);
      localStorage.setItem('username', signup.user.username);

      client.writeQuery({
        query: gql`
          query getLoggedIn {
            isLoggedIn
          }
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
        setMessage('There was an error creating your account');
      }
    }
  });

  const handleUsernameChange = e => {
    e.persist();
    setUsername(e.target.value);
  }

  const handleNameChange = e => {
    e.persist();
    setName(e.target.value);
  }

  const handleEmailChange = e => {
    e.persist();
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    e.persist();
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = e => {
    e.persist();
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (username.length === 0) {
      setMessage('You must enter a username');
    }

    if (email.length === 0) {
      setMessage('You must enter an email');
      return;
    }

    if (password.length === 0) {
      setMessage('You must enter a password');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Your passwords do not match');
    }

    signup({ 
      variables: {
        username,
        email,
        name,
        password,
      }
    });
  }

  return {
    username,
    handleUsernameChange,
    name,
    handleNameChange,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    confirmPassword,
    handleConfirmPasswordChange,
    handleSubmit,
    data,
    loading,
    message,
  }
}

export default useSignup;
