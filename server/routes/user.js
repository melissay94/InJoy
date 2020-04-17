const express = require("express");
const fs = require("fs");

const userFilePath = "./jsonData/user.json";

const router = express.Router();

// Get current user
router.post("/login", (req, res) => {
  const allUsers = JSON.parse(fs.readFileSync(userFilePath));
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const currentUser = allUsers.filter(user => {
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

  const existingUser = allUsers.filter(user => {
    return (user.email === userEmail);
  });

  if (existingUser.length > 0) {
    res.send({ message: "Error, user already exists"});
    return;
  }

  const newUser = {
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
router.put("/:email/prompt", (req, res) => {
  let allUsers = JSON.parse(fs.readFileSync(userFilePath));
  const email = req.params.email;
  const currentUser = allUsers.filter(user => {
    return (user.email === email);
  });

  const currentUserIdx = allUsers.indexOf(currentUser);
  currentUser.current_prompt = req.body.prompt;

  allUsers = allUsers.slice(0, currentUserIdx) + currentUser + allUsers.slice(currentUserIdx+1);

  fs.writeFileSync(userFilePath, JSON.stringify(allUsers));

  res.send(currentUser);
});

// Add a post
router.put("/:email/post", (req, res) => {
  let allUsers = JSON.parse(fs.readFileSync(userFilePath));
  const email = req.params.email;
  const currentUser = allUsers.filter(user => {
    return (user.email === email);
  });

  const currentUserIdx = allUsers.indexOf(currentUser);
  currentUser.posts.push(req.body.post);

  allUsers = allUsers.slice(0, currentUserIdx) + currentUser + allUsers.slice(currentUserIdx+1);

  fs.writeFileSync(userFilePath, JSON.stringify(allUsers));

  res.send(currentUser);
});

module.exports = router;