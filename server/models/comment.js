'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};