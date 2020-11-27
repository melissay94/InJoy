async function comments(user) {
  const comments = await user.getComments();

  return comments ? comments : [];
}

async function following(user) {
  const following = await user.getFollowed();

  return following ? following : [];
}

async function categories(user) {
  const categories = await user.getCategories();

  return categories ? categories : [];
}

async function posts(user) {
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

async function currentPrompt(user) {
  const currentPrompt = await user.getCurrentPrompt();

  return currentPrompt ? currentPrompt : null;
}

async function prompts(user) {
  const prompts = await user.getPrompts();

  if (prompts) {
    return prompts;
  } else {
    throw new Error("No prompts found for this user");
  }
}

module.exports = {
  comments,
  following,
  categories,
  posts,
  postsLiked,
  prompts
}
