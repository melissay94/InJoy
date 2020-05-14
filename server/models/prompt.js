'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    tips: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Prompt.associate = function(models) {
    // associations can be defined here
  };
  return Prompt;
};