const { Model, DataTypes, Sequelize } = require('sequelize');
const { SPECIALIST_TABLE } = require('./specialistModel');
const { SERVICE_TABLE } = require('./serviceModel');

const SPECIALIST_SERVICE_TABLE = 'specialists_services';

const SpecialistServiceSchema = {
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

class SpecialistService extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SPECIALIST_SERVICE_TABLE,
      modelName: 'SpecialistService',
      timestamps: false,
    };
  }
}

module.exports = { SPECIALIST_SERVICE_TABLE, SpecialistServiceSchema, SpecialistService };
