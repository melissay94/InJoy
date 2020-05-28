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

module.exports = {
  currentUser,
}