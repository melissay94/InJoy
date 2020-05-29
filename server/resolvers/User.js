async function currentPrompt(user) {
  const prompt = await user.getPrompt();

  return prompt ? prompt : null;
}

async function comments(user) {
  const comments = await user.getComments();

  return comments ? comments : [];
}

async function following(user) {
  const following = await user.getUsers();

  return following ? following : [];
}

async function categories(user) {
  const categories = await user.getCategories();

  return categories ? categories : [];
}

async function postsCreated(user) {
  const posts = await user.getPosts();

  if (posts) {
    return posts;
  } else {
    throw new Error("No posts found for this user");
  }
}

async function postsLiked(user) {
  const likes = await user.getLikes();

  if (likes) {
    return likes;
  } else {
    throw new Error("No liked posts found for this user");
  }
}

module.exports = {
  currentPrompt,
  comments,
  following,
  categories,
  postsCreated,
  postsLiked
}