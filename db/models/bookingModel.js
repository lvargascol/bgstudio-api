const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customerModel');
const { SPECIALIST_TABLE } = require('./specialistModel');
const { ORDER_TABLE } = require('./orderModel');

const BOOKING_TABLE = 'bookings';

const BookingSchema = {
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
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  minutes: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  depositCheck: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'deposit_check',
    defaultValue: false,
  },
  done: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notes: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  specialistId: {
    field: 'specialist_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: SPECIALIST_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

class Booking extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsTo(models.Specialist, { as: 'specialist' });
    this.belongsTo(models.Order, { as: 'order' });
    this.belongsToMany(models.Service, {
      as: 'services',
      through: models.BookingService,
      foreignKey: 'bookingId',
      otherKey: 'serviceId',
    });
    this.belongsToMany(models.Promo, {
      as: 'promos',
      through: models.BookingPromo,
      foreignKey: 'bookingId',
      otherKey: 'promoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOKING_TABLE,
      modelName: 'Booking',
      timestamps: false,
    };
  }
}

module.exports = { BOOKING_TABLE, BookingSchema, Booking };
