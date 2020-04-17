// Packages
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

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
    <Slide direction="up" mountOnEnter unmountOnExit in="true">
    <div>
      <h2 className="fancy">New Post</h2>
      <h3>Prompt: {id}</h3>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
            <TextField label="Title" type="text" name="title" onChange={e => setTitle(e.target.value)} />
            <TextField label="What did you do?" multiline type="type" name="description" onChange={e => setDescription(e.target.value)} />
          <Button type="submit">Submit</Button>
        </form>
    </div>
    </Slide>
  )
}

export default NewPost
