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
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
  }, {});
  prompt.associate = function(models) {
    // A prompt can have many posts created for it
    prompt.hasMany(models.post);
    // A prompt can be created by a user
    prompt.belongsTo(models.user, {
      as: 'createdPrompt',
      foreignKey: 'createdPromptId'
    });
    // A prompt has a category it belongs to
    prompt.belongsTo(models.category);
    // A prompt has many users subscribed to it
    prompt.hasMany(models.user, {
      foreignKey: 'currentPromptId',
    });
  };
  return prompt;
};
