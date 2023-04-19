const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./userModel');

const SPECIALIST_TABLE = 'specialists';

const SpecialistSchema = {
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
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  position: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  startedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'started_at',
  },
  birthday: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    field: 'user_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Specialist extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Booking, {
      as: 'bookings',
      foreignKey: 'specialistId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SPECIALIST_TABLE,
      modelName: 'Specialist',
      timestamps: false,
    };
  }
}

module.exports = { SPECIALIST_TABLE, SpecialistSchema, Specialist };
