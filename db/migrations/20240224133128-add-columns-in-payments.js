'use strict';

// const {
//   PaymentSchema,
//   PAYMENT_TABLE,
// } = require('../models/paymentModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn(
    //   PAYMENT_TABLE,
    //   'type',
    //   PaymentSchema.type
    // );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PAYMENT_TABLE, 'type');
  }
};
