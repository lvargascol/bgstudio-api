const { Model, DataTypes, Sequelize } = require('sequelize');

const CONSUMABLE_TABLE = 'consumables';

const ConsumableSchema = {
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
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
};

class Consumable extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONSUMABLE_TABLE,
      modelName: 'Consumable',
      timestamps: false,
    };
  }
}

module.exports = { CONSUMABLE_TABLE, ConsumableSchema, Consumable };
