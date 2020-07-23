
// Post mutations
async function createPost(root, { promptId }, { currentUser, models }) {
  // Need the user
  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }, 
    include: models.post
  });

  if (!user) {
    throw new Error("Could not get current user information");
  }

  const prompt = await models.prompt.findOne({
    where: {
      id: promptId
    }
  });

  if (!prompt) {
    throw new Error(`Could not find prompt for given prompt id`);
  }

  const unpublishedPosts = filterUnpublishedPosts(user.posts);

  if (unpublishedPosts.length !== 0) {
    const updatedPost = await unpublishedPosts[0].update({
      promptId: prompt.id
    });

    if (!updatedPost) {
      throw new Error(`Could not assign new prompt for ${user.username}`);
    }

    return updatedPost;
  }

  const newPost = await models.post.create({
    userId: user.id,
    promptId: prompt.id
  });

  if (!newPost) {
    throw new Error(`Could not assign new prompt for ${user.username}`);
  }

  return newPost;

}

async function publishPost(root, { title, description, image }, { currentUser, models }) {

  if ((!description || description.length === 0) && (!image || image.length === 0)) {
    throw new Error("Must include at least a description or an image");
  }

  const user = await models.user.findOne({
    where: { 
      id: currentUser.userId
     },
    include: models.post
  });

  if (!user) {
    throw new Error("Could not find user");
  }

  const newPost = filterUnpublishedPosts(user.posts);

  if (newPost.length === 0) {
    throw new Error("Invalid prompt. Cannot make post, please choose a new prompt.");
  }

  const updatedPost = await newPost[0].update({
    title,
    description, 
    image,
    hasPosted: true
  });

  if (!updatedPost) {
    throw new Error("Unable to publish post.");
  }

  return updatedPost;
}

function filterUnpublishedPosts(posts) {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return posts.filter(post => {

    const postDate = new Date(post.updatedAt);
    const dateDiff = (Math.abs(postDate - yesterday)) / (1000 * 60 * 60);

    return !post.hasPosted && dateDiff < 24;
  });
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

  const post = await models.post.findOne({
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

  const postDeleted = await models.post.destroy({
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
    }
  });

  if (!post) {
    throw new Error("Unable to like post at this time.");
  }

  const user = await models.user.findOne({
    where: { 
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error ("Unable to like post at this time.");
  }

  // Users in this case is the likes table
  const likes = await post.getUsers();

  const likeIds = likes.map(user => {
    return user.id
  });

  if (likeIds.includes(user.id)) {
    throw new Error("User has already liked this post.");
  }

  const likedPost = await post.addUsers(user);

  return likedPost ? true : false;
}

async function removeLikeFromPost(root, { id }, { currentUser, models }) {

  const post = await models.post.findOne({
    where: { id }
  });

  if (!post) {
    throw new Error("Was unable to unlike post at this time.");
  }

  const user = await models.user.findOne({
    where: { 
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error("Was unable to unlike post at this time.");
  }

  const removedLike = await post.removeUsers(user);

  return removedLike ? true : false;
}

module.exports = {
  createPost,
  publishPost,
  editPost,
  deletePost,
  addLikeToPost,
  removeLikeFromPost
}
