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
    // associations can be defined here
    category.belongsToMany(models.user, { through: "usercategories" });
    category.hasMany(models.prompt);
  };
  return category;
};