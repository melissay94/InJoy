'use strict';
module.exports = (sequelize, DataTypes) => {
  const following = sequelize.define('following', {
    userId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {});
  following.associate = function(models) {
    // No associations, just a join table
  };
  return following;
};