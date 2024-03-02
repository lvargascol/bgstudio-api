'use strict';

// const {
//   UserSchema,
//   USER_TABLE,
// } = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn(
    //   USER_TABLE,
    //   'recovery_token',
    //   UserSchema.recoveryToken
    // );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
