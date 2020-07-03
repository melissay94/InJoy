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
    // A post is created by a user
    models.post.belongsTo(models.user);
    // A post is created to complete a prompt
    models.post.belongsTo(models.prompt);
    // A post has many comments posted to it
    models.post.hasMany(models.comment);
    // Posts can be liked by multiple users
    models.post.belongsToMany(models.user, { through: "likes" });
  };
  return post;
};