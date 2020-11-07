'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: "auth0|5fa057099951970068077f7a",
        name: 'Matthew Everett',
        email: 'mjheverett@gmail.com'
      },
      {
        id: "auth0|5fa2c973ac5d9500719555d3",
        name: 'Katy Sage',
        email: 'katysage1@gmail.com'
      },
      {
        id: "auth0|5fa056d9a8efd4006f8175a4",
        name: 'Harmony Trevena',
        email: 'harmonytrevena@gmail.com'
      },
      {
        id: "auth0|5fa056f0a8efd4006f8175b7",
        name: 'Dylan Cooper',
        email: 'dylancooper155@gmail.com'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', [
      {
        id: "auth0|5fa057099951970068077f7a",
        name: 'Matthew Everett',
        email: 'mjheverett@gmail.com'
      },
      {
        id: "auth0|5fa2c973ac5d9500719555d3",
        name: 'Katy Sage',
        email: 'katysage1@gmail.com'
      },
      {
        id: "auth0|5fa056d9a8efd4006f8175a4",
        name: 'Harmony Trevena',
        email: 'harmonytrevena@gmail.com'
      },
      {
        id: "auth0|5fa056f0a8efd4006f8175b7",
        name: 'Dylan Cooper',
        email: 'dylancooper155@gmail.com'
      }
    ], {});
  }
};
