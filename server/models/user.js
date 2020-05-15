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
    promptId: DataTypes.INTEGER,
    promptExp: DataTypes.DATE,
    hasPosted: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreated: (createdUser, options) => {
        if (createdUser && createdUser.password) {
          const hash = bcrypt.hashSync(createdUser.password, 10);
          createdUser.password = hash;
        }
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
    user.belongsToMany(models.User, { through: "followings" });
    user.belongsToMany(models.Post, { through: "likes" });
    user.belongsToMany(models.Category, { through: "usercategories"});
    user.hasMany(models.Comment);
    user.hasMany(models.Post);
    user.belongsTo(models.Prompt);
  };

  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  user.prototype.toJSON  = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return user;
};