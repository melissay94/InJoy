'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    promptId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    // 1 prompt: M posts, 1 user: M posts
    models.post.belongsTo(models.user);
    models.post.belongsTo(models.prompt);
  };
  return post;
};