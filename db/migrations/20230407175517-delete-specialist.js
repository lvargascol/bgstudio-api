'use strict';

const {
  SpecialistSchema,
  SPECIALIST_TABLE,
} = require('./../models/specialistModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable(SPECIALIST_TABLE);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable(SPECIALIST_TABLE, SpecialistSchema);
  },
};
