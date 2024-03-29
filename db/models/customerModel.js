const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./userModel');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Booking, {
      as: 'bookings',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
