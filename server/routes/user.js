const express = require("express");
const fs = require("fs");

const userFilePath = "./jsonData/user.json";
const feedFilePath = './jsonData/feed.json';
const promptFilePath = "./jsonData/prompts.json";

const router = express.Router();

// Get current user
router.post("/login", (req, res) => {
  const allUsers = JSON.parse(fs.readFileSync(userFilePath));
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const currentUser = allUsers.find(user => {
    return (user.email === userEmail && user.password === userPassword);
  });

  res.send(currentUser);
});

// Create a user
router.post("/signup", (req, res) => {
  const allUsers = JSON.parse(fs.readFileSync(userFilePath));

  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (userPassword.length < 8) {
    res.send({ message: "Error, password needs to be at least 8 characters"});
    return;
  }

  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail))) {
    res.send({ message: "Error, invalid email, does not match email format"});
    return;
  }

  const existingUser = allUsers.find(user => {
    return (user.email === userEmail);
  });

  if (existingUser) {
    res.send({ message: "Error, user already exists"});
    return;
  }

  const newUser = {
    id: allUsers.length,
    name: userName, 
    email: userEmail, 
    password: userPassword, 
    current_prompt: null,
    posts: []
  }

  allUsers.push(newUser);
  fs.writeFileSync(userFilePath, JSON.stringify(allUsers));

  res.send(newUser);
});

// Update user prompt
router.post("/:id/prompt", (req, res) => {

  // Get json from users and prompts to update
  let allUsers = JSON.parse(fs.readFileSync(userFilePath));
  let allPrompts = JSON.parse(fs.readFileSync(promptFilePath));

  // Use the id to find the correct user
  const id = req.params.id;
  allUsers[id].current_prompt = req.body.title;

  // Check to see if the chosen prompt is already in our json of prompts
  const currentPrompt = allPrompts.find(prompt => {
    return prompt.title === allUsers[id].current_prompt;
  });

  // If it is not in the json, add it to the json for later
  if (!currentPrompt) {
    const newPrompt = {
      id: allPrompts.length,
      title: allUsers[id].current_prompt,
      type: req.body.type,
      posts: []
    }

    allPrompts.push(newPrompt);
    fs.writeFileSync(promptFilePath, JSON.stringify(allPrompts));
  }

  fs.writeFileSync(userFilePath, JSON.stringify(allUsers));

  res.send(allUsers[id]);
});

// Add a post
router.post("/:id/post", (req, res) => {

  // Get ALL OF THE JSON!
  let allUsers = JSON.parse(fs.readFileSync(userFilePath));
  let allPrompts = JSON.parse(fs.readFileSync(promptFilePath));
  let feed = JSON.parse(fs.readFileSync(feedFilePath));

  // Use id params to find current user
  const id = req.params.id;
  allUsers[id].posts.push(req.body.post);

  // Find the associated prompt the user was completing
  const currentPrompt = allPrompts.find(prompt => {
    return allUsers[id].current_prompt === prompt.title;
  });

  // If found, push the post to that prompt
  if (currentPrompt) {
    currentPrompt.posts.push(req.body.post);
  }

  // Push the post to the feed list
  feed.push(post);

  // Now write all the json
  fs.writeFileSync(userFilePath, JSON.stringify(allUsers));
  fs.writeFileSync(promptFilePath, JSON.stringify(allPrompts));
  fs.writeFileSync(feedFilePath, JSON.stringify(feed));

  res.send(allUsers[id]);
});

module.exports = router;