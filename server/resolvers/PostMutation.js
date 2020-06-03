
// Post mutations
async function createPost(root, { title, image, description }, { currentUser, models }) {
  // Need the user
  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error("Could not get current user information");
  }

  if (!user.promptId) {
    throw new Error(`Could not find an active prompt id for ${user.username}`)
  }

  const prompt = await models.prompt.findOne({
    where: {
      id: user.promptId
    }
  });

  if (!prompt) {
    throw new Error(`Could not find prompt for given prompt id`);
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate - 1);

  const promptDate = new Date(user.promptExp);
  const dateDiff = (Math.abs(promptDate - yesterday)) / (1000 * 60 * 60); // hours difference

  if (dateDiff > 24) {
    // If it has expired, update user to no longer have a prompt.
    await user.update({
      promptId: null,
      hasPosted: false
    });

    throw new Error(`${user.username}'s prompt has expired. Please select a new prompt.`);
  }

  const newPost = await models.post.create({
    title, 
    image,
    description,
    userId: user.id,
    promptId: prompt.id
  });

  if (!newPost) {
    throw new Error(`Could not create new post for ${user.username}`);
  }

  return newPost;

}

async function editPost(root, { id, title, description }, { currentUser, models }) {

  const post = await models.post.findOne({
    where: {
      id
    }
  });

  if (!post) {
    throw new Error("Could not retrieve post to update.");
  }

  if (post.userId != currentUser.userId) {
    throw new Error("Unable to edit post, not posted by current user.");
  }

  const updatedPost = await post.update({
    title: title || post.title,
    description: description || post.description
  });

  if (updatedPost) {
    return updatedPost;
  } else {
    throw new Error("Could not update post");
  }
}

async function deletePost(root, { id }, { models }) {

  const post = models.post.findOne({
    where: {
      id
    },
    include: models.comments
  });

  if (!post) {
    throw new Error("Issue finding post to delete.");
  }

  if (post.comments) {
    await Promise.all(
      post.comments.map(comment => {
        return models.comment.destroy({
          where: {
            id: comment.id
          }
        });
      }));
  }

  const postDeleted = await post.destroy({
    where: {
      id: post.id
    }
  });

  return postDeleted > 0;
}

async function addLikeToPost(root, { id }, { currentUser, models }) {

  const post = await models.post.findOne({
    where: {
      id
    },
    includes: models.user
  });

  if (!post) {
    throw new Error("Unable to like post at this time.");
  }

  const likeIds = post.users.map(user => {
    return user.id
  });

  if (likeIds.includes(currentUser.userId)) {
    throw new Error("User has already liked this post.");
  }

  const user = models.user.findOne({
    where: { id }
  });

  if (!user) {
    throw new Error ("Unable to like post at this time.");
  }

  const likedPost = await post.addUsers(user);

  return likedPost ? true : false;
}

async function removeLikeFromPost(root, { id }, { currentUser, models }) {

  const post = await models.post.findOne({
    where: { id }
  });

  const user = await models.user.findOne({
    where: { 
      id: currentUser.userId
    }
  });

  if (post && user) {
    return await post.removeUsers(user);
  }

  throw new Error("Was unable to unlike post at this time.");
}

module.exports = {
  createPost,
  editPost,
  deletePost,
  addLikeToPost,
  removeLikeFromPost
}