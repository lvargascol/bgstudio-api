const { Model, DataTypes, Sequelize } = require('sequelize');
const { BOOKING_TABLE } = require('./bookingModel');
const { PROMO_TABLE } = require('./promoModel');

const BOOKING_PROMO_TABLE = 'bookings_promos';

const BookingPromoSchema = {
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
  promoId: {
    field: 'promo_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: PROMO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class BookingPromo extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOKING_PROMO_TABLE,
      modelName: 'BookingPromo',
      timestamps: false,
    };
  }
}

module.exports = { BOOKING_PROMO_TABLE, BookingPromoSchema, BookingPromo };
