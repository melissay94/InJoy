// Packages
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const NewPost = props => {
  // Declare and initialize state variables
  const { id } = useParams();
  let [title, setTitle] = useState('')
  let [message, setMessage] = useState('')
  let [description, setDescription] = useState('')

  useEffect(() => {
    setMessage('')
  }, [title, description]);

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault();
    // update the list of posts
  }

  return (
    <div>
      <h2 className="fancy">New Post</h2>
      <h3>Prompt: {id}</h3>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Description:</label>
            <input type="type" name="description" onChange={e => setDescription(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default NewPost
