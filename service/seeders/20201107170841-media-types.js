'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Media', [
      {
        type: "e-book"
      },
      {
        type: "hardcover"
      },
      {
        type: "paperback"
      },
      {
        type: "audiobook"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Media', [
      {
        type: "e-book"
      },
      {
        type: "hardcover"
      },
      {
        type: "paperback"
      },
      {
        type: "audiobook"
      }
    ], {});
  }
};
