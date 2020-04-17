import { useState } from 'react';

const usePost = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    link: ''
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

export default usePost;
