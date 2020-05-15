'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    title: {
      type:DataTypes.STRING,
      validate:{
        len: {
          args: [1, 50],
          msg: "Invalid title length. Cannot exceed 50 characters."
        }
      }
    },
    image: DataTypes.STRING,
    tips: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 500],
          msg: "Invalid tips length. Cannot exceed 500 characters."
        }
      }
    },
    categoryId: DataTypes.INTEGER
  }, {});
  Prompt.associate = function(models) {
    // associations can be defined here
    Prompt.hasMany(models.Post);
    Prompt.hasMany(models.User);
    Prompt.belongsTo(models.Category);
  };
  return Prompt;
};