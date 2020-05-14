'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    promptId: DataTypes.INTEGER,
    promptExp: DataTypes.DATE,
    hasPosted: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};