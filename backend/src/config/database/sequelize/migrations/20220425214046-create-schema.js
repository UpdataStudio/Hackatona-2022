'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createSchema('hackathona');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropSchema('hackathona');
  }
};
