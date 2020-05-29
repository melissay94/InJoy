async function currentUser(root, args, { currentUser, models }) {

  // We have to do the Sequelize logic
  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  // We do what we need with the model
  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
}

async function user(root, { id }, { models }) {

  const user = await models.user.findOne({
    where: {
      id: id
    }
  });

  if (user) {
    return user;
  } else {
    throw new Error("Could not find user");
  }
}

async function posts(root, args, { models }) {
  const posts = await models.post.findAll();

  return posts ? posts : [];
}

async function post(root, { id }, { models }) {
  const post = await models.post.findOne({
    where: {
      id: id
    }
  });

  if (post) {
    return post;
  } else {
    throw new Error("Could not find post");
  }
}

module.exports = {
  currentUser,
  user,
  posts,
  post,
}