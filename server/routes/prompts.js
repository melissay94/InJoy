const express = require("express");
const fs = require("fs");

const promptFilePath = "./jsonData/prompts.json";

const router = express.Router();

// Get Prompt titles for navigation
router.get("/", (req, res) => {
  const allPrompts = JSON.parse(fs.readFileSync(promptFilePath));

  const promptTitles = allPrompts.map(prompt => {
    return prompt.title;
  });

  if (!promptTitles || promptTitles.length < 1) {
    res.send({ message: "Could not get any prompt titles at this time." });
    return;
  }

  res.send(promptTitles);
  return;
});

// Get random Prompt
router.get("/random", (req, res) => {
  const allPrompts = JSON.parse(fs.readFileSync(promptFilePath));

  const randomInt = Math.floor(Math.random() * allPrompts.length);

  if (!allPrompts[randomInt]) {
    res.send({message: "Could not retreive random prompt"});
    return;
  }
  res.send(allPrompts[randomInt]);
  return;
})

// Get posts based on title
router.get("/:title", (req, res) => {
  const allPrompts = JSON.parse(fs.readFileSync(promptFilePath));

  const title = req.params.title;

  const promptByTitle = allPrompts.find(prompt => {
    return prompt.title === title;
  });

  if (!promptByTitle.posts || promptByTitle.posts.length < 1) {
    res.send({ message: "Could not find any prompts for that title at this time." });
    return;
  }

  res.send(promptByTitle.posts);
  return;
})

// Create a new Prompt
router.post("/", (req, res) => {
  const allPrompts = JSON.parse(fs.readFileSync(promptFilePath));

  const existingPrompt = allPrompts.find(prompt => {
    return prompt.title === req.body.title;
  });

  if (existingPrompt) {
    res.send("Sorry, that prompt name is taken. Please enter another.");
    return;
  }

  const newPrompt = {
    id: allPrompts.length,
    title: req.body.title,
    type: req.body.type, 
    posts: []
  }

  allPrompts.push(newPrompt);

  fs.writeFileSync(promptFilePath, JSON.stringify(allPrompts));

  res.send(newPrompt);
  return;
});

module.exports = router;