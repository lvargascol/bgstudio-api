const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./productModel');
const { STOCK_TABLE } = require('./stockModel');

const PRODUCT_STOCK_TABLE = 'products_stocks';

const ProductStockSchema = {
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
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  stockId: {
    field: 'stock_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: STOCK_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class ProductStock extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_STOCK_TABLE,
      modelName: 'ProductStock',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_STOCK_TABLE, ProductStockSchema, ProductStock };
