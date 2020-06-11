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

async function prompt(root, { id }, { models }) {
  const prompt = await models.prompt.findOne({
    where: {
      id: id
    }
  });

  if (prompt) {
    return prompt;
  } else {
    throw new Error("Could not find prompt");
  }
}

async function prompts(root, args, { models }) {
  const prompts = await models.prompt.findAll();

  return prompts ? prompts : [];
}

async function comment(root, { id }, { models }) {
  const comment = await models.comment.findOne({
    where: {
      id: id
    }
  });

  if (comment) {
    return comment;
  } else {
    throw new Error("Could not find category");
  }
}

async function comments(root, args, { models }) {
  const comments = await models.comment.findAll();

  return comments ? comments : [];
}

async function category(root, { id }, { models }) {
  const category = await models.category.findOne({
    where: {
      id: id
    }
  });

  if (category) {
    return category;
  } else {
    throw new Error("Could not find category");
  }
}

async function categories(root, args, { models }) {
  const categories = await models.category.findAll();

  return categories ? categories : [];
}

module.exports = {
  currentUser,
  user,
  posts,
  post,
  prompt,
  prompts,
  comment,
  comments,
  category,
  categories
}