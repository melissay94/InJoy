// Packages
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import useRedirect from '../../hooks/useRedirect';
import usePost from '../../hooks/usePost';
import useCurrentUser from '../../hooks/query/useCurrentUser';
import { openUploadWidget } from '../../utils/CloudinarySetup';

export default function NewPost({ isLoggedIn }){
  // Declare and initialize state variables
  const [newPost, setNewPost] = useState(null);
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  let [message, setMessage] = useState(null);
  const { id } = useParams();

  const shouldRedirect = isLoggedIn ? false : true;
  useRedirect(shouldRedirect, isLoggedIn, useHistory());

  const { data: user, loading, error } = useCurrentUser();

  const handleUpload = () => {
    const options = {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      tags: ['feed'],
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
    };

    openUploadWidget(options, (error, photo) => {
      if (!error) {
        console.log(photo);
        if (photo.event === 'success') {
          setImage(photo.info.public_id);
        } else {
          console.log("Issue uploading photo");
        }
      } else {
        console.log(error);
      }
    })
  }

  // Need to change from axios to a mutation hook
  const sendPost = () => {
    handleUpload();
    axios.post(`http://localhost:4000/user/${user.id}/post`, {
      title: inputs.title,
      description: inputs.description,
      link: link,
      user: user.name,
      prompt: user.current_prompt
    }).then(response => {
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage(null);
        // setUser(response.data);
        setNewPost(response.data.posts[response.data.posts.length -1]);
      }
    }).catch(err => {
      setMessage("Error, something has gone wrong adding your post!");
      console.log(err);
    });
  }
  
  const { handleInputChange, handleSubmit, inputs } = usePost(sendPost);

  if (newPost) {
    return <div>
      Congrats! You posted!
      <a href="/feed">Go check out the feed!</a>
    </div>;
  }

  if (loading) {
    return (
      <div>
        loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        error.message
      </div>
    );
  }

  return (
    <Slide direction="up" mountOnEnter unmountOnExit in={true}>
    <div>
      <h2 className="fancy">Create a Post</h2>
      <h3>Prompt: {id}</h3>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <TextField label="Title" type="text" name="title" onChange={handleInputChange} value={inputs.title} />
          <TextField label="What did you do?" multiline type="text" name="description" onChange={handleInputChange} value={inputs.description} />
          {/* <TextField label="Do you have a link to an image?" type="url" name="link" onChange={handleInputChange} value={inputs.link} /> */}
          <Button onClick={()=>handleUpload()}>Upload an Image</Button>
          <Button type="submit">
              Submit
          </Button>
        </form>
    </div>
    </Slide>
  )
}

