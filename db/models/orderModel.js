const { Model, DataTypes, Sequelize } = require('sequelize');
// const { BOOKING_TABLE } = require('./bookingModel');
const { USER_TABLE } = require('./userModel');

const ORDER_TABLE = 'orders';

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
    // allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  orderTotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.bookingsTotal && this.productsTotal) {
        return this.bookingsTotal + this.productsTotal;
      } else if (this.bookingsTotal) {
        return this.bookingsTotal;
      } else if (this.productsTotal) {
        return this.productsTotal;
      }
    },
  },
  bookingsTotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.bookings?.length > 0) {
        return this.bookings.reduce((total, booking) => {
          return total + booking.cost;
        }, 0);
      }
    },
  },
  productsTotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items?.length > 0) {
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
    },
  },
  paymentsTotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.payments?.length > 0) {
        return this.payments.reduce((total, payment) => {
          return payment.confirmed ? total + payment.amount : total;
        }, 0);
      }
    },
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

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Booking, {
      as: 'bookings',
      foreignKey: 'orderId',
    });
    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'orderId',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
