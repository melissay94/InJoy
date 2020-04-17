import { useState } from 'react';

const useAddUser = (callback) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = e => {
    e.persist();
    setInputs({...inputs, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    callback();
  }

  return {
    handleInputChange,
    handleSubmit,
    inputs
  }
}

export default useAddUser;
