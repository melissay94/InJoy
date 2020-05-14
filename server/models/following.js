'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    userId: DataTypes.INTEGER,
    follwingId: DataTypes.INTEGER
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
  };
  return Following;
};