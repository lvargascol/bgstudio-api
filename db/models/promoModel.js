const { Model, DataTypes } = require('sequelize');

const PROMO_TABLE = 'promos';

const promoSchema = {
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
};

class Promo extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROMO_TABLE,
      modelName: 'Promo',
      timestamps: false,
    };
  }
}

module.exports = { PROMO_TABLE, promoSchema, Promo };
