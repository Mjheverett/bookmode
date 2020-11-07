'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Media', [
      {
        type: "e-book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "hardcover",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "paperback",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "audiobook",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Media', [
      {
        type: "e-book",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "hardcover",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "paperback",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "audiobook",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  }
};
