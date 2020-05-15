'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
      // 1 post: M comments, 1 user: M comments
      models.comment.belongsTo(models.user);
      models.comment.belongsTo(models.post);    
  };
  return Comment;
};