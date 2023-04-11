const { Model, DataTypes, Sequelize } = require('sequelize');
const { CONSUMABLE_TABLE } = require('./consumableModel');
const { STOCK_TABLE } = require('./stockModel');

const CONSUMABLE_STOCK_TABLE = 'consumables_stocks';

const ConsumableStockSchema = {
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
  consumableId: {
    field: 'consumable_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: CONSUMABLE_TABLE,
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

class ConsumableStock extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONSUMABLE_STOCK_TABLE,
      modelName: 'ConsumableStock',
      timestamps: false,
    };
  }
}

module.exports = { CONSUMABLE_STOCK_TABLE, ConsumableStockSchema, ConsumableStock };
