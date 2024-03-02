'use strict';

// const {
//   PAYMENT_TABLE,
// } = require('../models/paymentModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // await queryInterface.renameColumn(PAYMENT_TABLE, 'paid', 'confirmed');

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.renameColumn(PAYMENT_TABLE, 'confirmed', 'paid');

  }
};
