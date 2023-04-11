const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROMO_TABLE } = require('./promoModel');
const { SERVICE_TABLE } = require('./serviceModel');

const PROMO_SERVICE_TABLE = 'promos_services';

const PromoServiceSchema = {
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

class PromoService extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROMO_SERVICE_TABLE,
      modelName: 'PromoService',
      timestamps: false,
    };
  }
}

module.exports = { PROMO_SERVICE_TABLE, PromoServiceSchema, PromoService };
