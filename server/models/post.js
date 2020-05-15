'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    promptId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    // 1 prompt: M posts, 1 user: M posts
    models.post.belongsTo(models.user);
    models.post.belongsTo(models.prompt);
  };
  return Post;
};