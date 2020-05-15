'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.User, { through: "Following" });
    User.belongsToMany(models.Post, { through: "Like" });
    User.belongsToMany(models.Category, { through: "UserCategory"});
    User.hasMany(models.Comment);
    User.hasMany(models.Post);
    User.belongsTo(models.Prompt);
  };

  User.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  }

  User.prototype.toJSON  = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  }

  return User;
};