const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./orderModel');

const PAYMENT_TABLE = 'payments';

const PaymentSchema = {
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
  confirmed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Payment extends Model {
  static associate(models) {
    this.belongsTo(models.Order, { as: 'order' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PAYMENT_TABLE,
      modelName: 'Payment',
      timestamps: false,
    };
  }
}

module.exports = { PAYMENT_TABLE, PaymentSchema, Payment };
