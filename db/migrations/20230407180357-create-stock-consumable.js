'use strict';

const { ConsumableSchema, CONSUMABLE_TABLE } = require('./../models/consumableModel');
const { StockSchema, STOCK_TABLE } = require('./../models/stockModel');
const { ConsumableStockSchema, CONSUMABLE_STOCK_TABLE } = require('./../models/consumable-stockModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CONSUMABLE_TABLE, ConsumableSchema);
    await queryInterface.createTable(STOCK_TABLE, StockSchema);
    await queryInterface.createTable(CONSUMABLE_STOCK_TABLE, ConsumableStockSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CONSUMABLE_TABLE);
    await queryInterface.dropTable(STOCK_TABLE);
    await queryInterface.dropTable(CONSUMABLE_STOCK_TABLE);
  },
};
