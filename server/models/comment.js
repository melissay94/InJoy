'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // A comment is posted by a user
    models.comment.belongsTo(models.user);
    // A comment is attached to a post
    models.comment.belongsTo(models.post);    
  };
  return comment;
};