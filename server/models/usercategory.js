'use strict';
module.exports = (sequelize, DataTypes) => {
  const usercategory = sequelize.define('usercategory', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  usercategory.associate = function(models) {
    // associations can be defined here
  };
  return usercategory;
};