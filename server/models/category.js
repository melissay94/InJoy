'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
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
  category.associate = function(models) {
    // Many users can have many categories
    category.belongsToMany(models.user, { through: "usercategories" });
    // Each category has many prompts tied to it
    category.hasMany(models.prompt);
  };
  return category;
};