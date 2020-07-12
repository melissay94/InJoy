const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signup(root, { username, email, password, name, profileImage }, { currentUser, models }) {
  if (currentUser) {
    throw new Error("User already signed in");
  }

  const [user, created]  = await models.user.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      username,
      email,
      password,
      name,
      profileImage
    }
  });

  if (created) {
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: `${60 * 60 * 24}s` });

    return {
      token,
      user
    }
  } else {
    throw new Error("Error, user already exists");
  }
}

async function login(root, { email, password }, { currentUser, models }) {
  // Check for currentUser
  if (currentUser) {
    throw new Error("User already signed in");
  }

  // Sequelize logic
  const user = await models.user.findOne({
    where: {
      email: email
    }
  });

  if (!user || !user.validPassword(password)) {
    throw new Error("Could not login user");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, { expiresIn: `${60 * 60 * 24}s` });
  return {
    user, 
    token
  }
}

async function followUser(root, { id }, { currentUser, models }) {

  if (id === currentUser.userId) {
     throw new Error("User cannot follow themselves");
  }

  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  const follow = await models.user.findOne({
    where: {
      id
    }
  });

  if (user && follow) {
    await user.addFollowed(follow);
    return user;
  }
}

async function editCurrentUser(root, { username, email, name, profileImage }, { currentUser, models }) {
  
  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  if (user) {
    const updatedUser = await user.update({
      username: username || user.username,
      email: email || user.email,
      name: name || user.name,
      profileImage: profileImage || user.profileImage
    });

    if (updatedUser) {
      const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET, { expiresIn: `${60 * 60 * 24}s` });
      return {
        user: updatedUser,
        token
      }
    } else {
      throw new Error(`Could not update user ${username} info`);
    }
  }
}

async function editCurrentUserPassword(root, { password, newPassword }, { currentUser, models }) {

  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error("User could not be found");
  }
  
  if (!user.validPassword(password)) {
    throw new Error("Invalid password entered");
  }

  const updatedUser = await user.update({
    password: newPassword
  });

  if (!updatedUser) {
    throw new Error(`Unable to update password for ${user.username}`);
  }

  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET, { expiresIn: `${60 * 60 * 24}s` });
  return {
    user: updatedUser,
    token
  }
}

async function updateCurrentUserPrompt(root, { promptId }, { currentUser, models }) {

  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error("User could not be found");
  }

  const prompt = await models.prompt.findOne({
    where: {
      id: promptId
    }
  });

  if (!prompt) {
    throw new Error("Invalid prompt. Could not find.");
  }

  const updatedUser = user.update({
    promptId,
    promptExp: new Date()
  });

  if (!updatedUser) {
    throw new Error(`Unable to update ${user.username}'s current prompt`);
  }

  return updatedUser;
}

async function deleteCurrentUser(root, args, { currentUser, models }) {

  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    },
    include: models.post
  });

  if (user.posts) {
    await Promise.all(
      user.posts.map(post => {
        return models.post.destroy({
          where: {
            id: post.id
          }
        });
      }));
  }

  if (user) {
    const userDeleted = await models.user.destroy({
      where: {
        id: user.id
      }
    });

    return userDeleted > 0;
  } else {
    throw new Error("Could not find current user");
  }
}

module.exports = {
  signup,
  login,
  followUser,
  editCurrentUser,
  editCurrentUserPassword,
  deleteCurrentUser,
  updateCurrentUserPrompt
}
