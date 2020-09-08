async function prompt(post) {
  const prompt = await post.getPrompt();

  return prompt ? prompt : null;
}

async function user(post) {
  const user = await post.getUser();

  return user ? user : null;
}

async function comments(post)  {
  const comments = await post.getComments();

  return comments ? comments : [];
}

async function likes(post)  {
  const likes = await post.getUsers();

  return likes ? likes : [];
}

module.exports = {
  prompt,
  user,
  comments,
  likes
}
