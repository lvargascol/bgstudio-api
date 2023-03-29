const { Model, DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('./categoryModel');

const SERVICE_TABLE = 'services';

const ServiceSchema = {
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
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  minutes: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    defaultValue: 'bit.ly/3nixwpw',
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    reference: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Service extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICE_TABLE,
      modelName: 'Service',
      timestamps: false,
    };
  }
}

module.exports = { SERVICE_TABLE, ServiceSchema, Service };
