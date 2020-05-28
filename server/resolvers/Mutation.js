const jwt = require('jsonwebtoken');
require('dotenv').config();

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
  login,
}