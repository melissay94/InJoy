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

module.exports = {
  signup,
  login,
}