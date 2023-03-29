const { Model, DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('./orderModel');

const PAYMENT_TABLE = 'payments';

const paymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  paid: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  orderId: {
    field: 'order_id',
    allowNull: true,
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
  static associate() {
    // associate
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

module.exports = { PAYMENT_TABLE, paymentSchema, Payment };
