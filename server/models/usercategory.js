'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define('UserCategory', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  UserCategory.associate = function(models) {
    // associations can be defined here
  };
  return UserCategory;
};