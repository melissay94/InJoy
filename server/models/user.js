'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 50],
          msg: "Invalid name length. Name must not exceed 50 characters."
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 50],
          msg: "Invalid username length. Username must be between 6 and 50 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [12, 99],
          msg: "Invalid password length. Must be between 12 and 99 characters"
        }
      },
      is: {
        args: /(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).+/,
        msg: "Missing neccessary password characters. Please include at least one lowercase letter, one uppercase letter, one number, and one special character."
      }
    },
    profileImage: DataTypes.STRING,
    currentPromptId: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: (createdUser, options) => {
        if (createdUser && createdUser.password) {
          const hash = bcrypt.hashSync(createdUser.password, 10);
          createdUser.password = hash;
        }
      },
      beforeUpdate: (updatedUser, options) => {
        if (updatedUser && updatedUser.changed('password')) {
          const hash = bcrypt.hashSync(updatedUser.password, 10);
          updatedUser.password = hash;
        }
      }
    }
  });

  user.associate = function(models) {
    // User can have one current prompt
    user.belongsTo(models.prompt);
    // Users can follow other users
    user.belongsToMany(models.user, { as: 'followed', through: "followings" });
    // Users can like many posts
    user.belongsToMany(models.post, { through: "likes" });
    // Users can save many categories
    user.belongsToMany(models.category, { through: "usercategories"});
    // A user can create multiple comments
    user.hasMany(models.comment);
    // A user can create multiple posts
    user.hasMany(models.post);
    // A user can create multiple prompts
    user.hasMany(models.prompt, {
      foreignKey: 'authorId',
    });
  };

  user.prototype.validPassword = function(passwordTyped) {
    const isValid = bcrypt.compareSync(passwordTyped, this.password);
    return isValid;
  }

  user.prototype.toJSON  = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
};
