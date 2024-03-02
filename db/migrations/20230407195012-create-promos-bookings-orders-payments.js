'use strict';

const { DataTypes, Sequelize } = require('sequelize');


const { BookingSchema, BOOKING_TABLE } = require('./../models/bookingModel');
const { ORDER_TABLE } = require('./../models/orderModel');
const { PaymentSchema, PAYMENT_TABLE } = require('./../models/paymentModel');
const { PromoSchema, PROMO_TABLE } = require('./../models/promoModel');

const { USER_TABLE } = require('./../models/userModel');


const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};


const {
  BookingPromoSchema,
  BOOKING_PROMO_TABLE,
} = require('./../models/booking-promoModel');
const {
  BookingServiceSchema,
  BOOKING_SERVICE_TABLE,
} = require('./../models/booking-serviceModel');
const {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
} = require('./../models/order-productModel');
const {
  ProductStockSchema,
  PRODUCT_STOCK_TABLE,
} = require('./../models/product-stockModel');
const {
  PromoServiceSchema,
  PROMO_SERVICE_TABLE,
} = require('./../models/promo-serviceModel');
const {
  SpecialistServiceSchema,
  SPECIALIST_SERVICE_TABLE,
} = require('./../models/specialist-serviceModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(BOOKING_TABLE, BookingSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
    await queryInterface.createTable(PROMO_TABLE, PromoSchema);

    await queryInterface.createTable(BOOKING_PROMO_TABLE, BookingPromoSchema);
    await queryInterface.createTable(
      BOOKING_SERVICE_TABLE,
      BookingServiceSchema
    );
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.createTable(PRODUCT_STOCK_TABLE, ProductStockSchema);
    await queryInterface.createTable(PROMO_SERVICE_TABLE, PromoServiceSchema);
    await queryInterface.createTable(
      SPECIALIST_SERVICE_TABLE,
      SpecialistServiceSchema
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(BOOKING_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PAYMENT_TABLE);
    await queryInterface.dropTable(PROMO_TABLE);

    await queryInterface.dropTable(BOOKING_PROMO_TABLE);
    await queryInterface.dropTable(BOOKING_SERVICE_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(PRODUCT_STOCK_TABLE);
    await queryInterface.dropTable(PROMO_SERVICE_TABLE);
    await queryInterface.dropTable(SPECIALIST_SERVICE_TABLE);
  },
};
