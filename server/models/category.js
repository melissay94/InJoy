'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 120],
          msg: "Invalid name length. Must not exceed 120 characters."
        }
      }
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.User, { through: "UserCategory" });
    Category.hasMany(models.Prompt);
  };
  return Category;
};