async function postsCreated(user) {
  const posts = await user.getPosts();

  if (posts) {
    return posts;
  } else {
    throw new Error("No posts found for this user");
  }
}

module.exports = {
  postsCreated,
}