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

  if (!user) {
    throw new Error("Could not find user to follow");
  }

  const follow = await models.user.findOne({
    where: {
      id
    }
  });

  if (!follow) {
    throw new Error("Could not follow user");
  }

  await user.addFollowed(follow);
  return user;
}

async function unfollowUser(root, { id }, { currentUser, models }) {

  if (id === currentUser.userId) {
    throw new Error("User cannot unfollow themselves");
  }

  const user = await models.user.findOne({
    where: {
      id: currentUser.userId
    }
  });

  if (!user) {
    throw new Error("Could not find user to unfollow");
  }

  const currentlyFollowing = await user.getFollowed();
  const followingIds = currentlyFollowing.map(user => user.id);

  const following = await models.user.findOne({
    where: {
      id
    }
  });

  if (!following) {
    throw new Error("Was unable to unfollow other user");
  }

  if (!followingIds.includes(following.id)) {
    throw new Error("Cannot unfollow a user you're not following");
  }

  await user.removeFollowed(following);

  return user;

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
  unfollowUser,
  editCurrentUser,
  editCurrentUserPassword,
  deleteCurrentUser
}
