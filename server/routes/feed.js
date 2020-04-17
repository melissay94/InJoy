const express = require("express");
const fs = require("fs");

const feedFilePath = "./jsonData/feed.json";

const router = express.Router();

// Get all posts
router.get("/", (req, res) => {
  const feed = JSON.parse(fs.readFileSync(feedFilePath));

  if (!feed || feed.length < 1) {
    res.send({ message: "There is no feed available." });
    return;
  }

  res.send(feeed);
});

module.exports = router;