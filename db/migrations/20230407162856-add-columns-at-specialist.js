'use strict';

const {
  SpecialistSchema,
  SPECIALIST_TABLE,
} = require('./../models/specialistModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn(
    //   SPECIALIST_TABLE,
    //   'started_at',
    //   SpecialistSchema.startedAt
    // );
    // await queryInterface.addColumn(
    //   SPECIALIST_TABLE,
    //   'birthday',
    //   SpecialistSchema.birthday
    // );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.removeColumn(SPECIALIST_TABLE, 'started_at');
    // await queryInterface.removeColumn(SPECIALIST_TABLE, 'birthday');
  },
};
