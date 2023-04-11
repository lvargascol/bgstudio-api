const { Model, DataTypes, Sequelize } = require('sequelize');

const STOCK_TABLE = 'stocks';

const StockSchema = {
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
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  closed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
  },
};

class Stock extends Model {
  static associate(models) {
    this.belongsToMany(models.Consumable, {
      as: 'consumables',
      through: models.ConsumableStock,
      foreignKey: 'stockId',
      otherKey: 'consumableId',
    });
    this.belongsToMany(models.Product, {
      as: 'products',
      through: models.ProductStock,
      foreignKey: 'stockId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STOCK_TABLE,
      modelName: 'Stock',
      timestamps: false,
    };
  }
}

module.exports = { STOCK_TABLE, StockSchema, Stock };
