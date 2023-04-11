const { Model, DataTypes, Sequelize } = require('sequelize');
const { BOOKING_TABLE } = require('./bookingModel');
const { SERVICE_TABLE } = require('./serviceModel');

const BOOKING_SERVICE_TABLE = 'bookings_services';

const BookingServiceSchema = {
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
  bookingId: {
    field: 'booking_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: BOOKING_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  serviceId: {
    field: 'service_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: SERVICE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class BookingService extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOKING_SERVICE_TABLE,
      modelName: 'BookingService',
      timestamps: false,
    };
  }
}

module.exports = { BOOKING_SERVICE_TABLE, BookingServiceSchema, BookingService };
