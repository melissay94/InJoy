'use strict';
module.exports = (sequelize, DataTypes) => {
  const following = sequelize.define('following', {
    userId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {});
  following.associate = function(models) {
    // associations can be defined here
  };
  return following;
};