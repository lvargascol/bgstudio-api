'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customerModel');
const { SpecialistSchema, SPECIALIST_TABLE } = require('./../models/specialistModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(SPECIALIST_TABLE, SpecialistSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(SPECIALIST_TABLE);
  },
};
