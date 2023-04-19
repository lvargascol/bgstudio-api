'use strict';

// const {
//   SpecialistSchema,
//   SPECIALIST_TABLE,
// } = require('./../models/specialistModel');

// const {
//   ServiceSchema,
//   SERVICE_TABLE,
// } = require('./../models/serviceModel');

// const {
//   PromoSchema,
//   PROMO_TABLE,
// } = require('./../models/promoModel');

// const {
//   ProductSchema,
//   PRODUCT_TABLE,
// } = require('./../models/productModel');

// const {
//   BookingSchema,
//   BOOKING_TABLE,
// } = require('./../models/bookingModel');

// const {
//   OrderSchema,
//   ORDER_TABLE,
// } = require('./../models/orderModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn(
    //   SPECIALIST_TABLE,
    //   'active',
    //   SpecialistSchema.active
    // );
    //     await queryInterface.addColumn(
    //   SERVICE_TABLE,
    //   'active',
    //   ServiceSchema.active
    // );
    //     await queryInterface.addColumn(
    //   PROMO_TABLE,
    //   'active',
    //   PromoSchema.active
    // );
    //     await queryInterface.addColumn(
    //   PRODUCT_TABLE,
    //   'active',
    //   ProductSchema.active
    // );
    // await queryInterface.addColumn(
    //   BOOKING_TABLE,
    //   'notes',
    //   BookingSchema.notes
    // );
    // await queryInterface.addColumn(
    //   ORDER_TABLE,
    //   'notes',
    //   OrderSchema.notes
    // );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn(SPECIALIST_TABLE, 'active');
    // await queryInterface.removeColumn(SERVICE_TABLE, 'active');
    // await queryInterface.removeColumn(PROMO_TABLE, 'active');
    // await queryInterface.removeColumn(PRODUCT_TABLE, 'active');
    // await queryInterface.removeColumn(BOOKING_TABLE, 'notes');
    // await queryInterface.removeColumn(ORDER_TABLE, 'notes');
  }
};
