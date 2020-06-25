'use strict';
module.exports = (sequelize, DataTypes) => {
  const prompt = sequelize.define('prompt', {
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
  prompt.associate = function(models) {
    // associations can be defined here
    prompt.hasMany(models.post);
    prompt.belongsTo(models.user);
    prompt.hasMany(models.user)
    prompt.belongsTo(models.category);
  };
  return prompt;
};