'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
      // 1 post: M comments, 1 user: M comments
      models.comment.belongsTo(models.user);
      models.comment.belongsTo(models.post);    
  };
  return comment;
};