'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('categories', [{
      name: "Art",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Education",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "DIY",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Chore",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Relaxation",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Social",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Writing",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Music",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', [{
      name: "Art"
    },{
      name: "Education"
    },{
      name: "DIY"
    },{
      name: "Chore"
    },{
      name: "Relaxation"
    },{
      name: "Social"
    },{
      name: "Cooking"
    },{
      name: "Writing"
    }, {
      name: "Music"
    }], {});
  }
};
