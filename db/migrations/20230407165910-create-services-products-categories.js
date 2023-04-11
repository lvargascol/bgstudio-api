'use strict';

const { CategorySchema, CATEGORY_TABLE } = require('./../models/categoryModel');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/productModel');
const { ServiceSchema, SERVICE_TABLE } = require('./../models/serviceModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(SERVICE_TABLE, ServiceSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(SERVICE_TABLE);
  },
};
