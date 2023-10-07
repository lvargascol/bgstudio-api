const { Model, DataTypes, Sequelize } = require('sequelize');

const PROMO_TABLE = 'promos';

const PromoSchema = {
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
    unique: false,
    defaultValue: 'bit.ly/3nixwpw',
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

class Promo extends Model {
  static associate(models) {
    this.belongsToMany(models.Service, {
      as: 'services',
      through: models.PromoService,
      foreignKey: 'promoId',
      otherKey: 'serviceId',
    });
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

module.exports = { PROMO_TABLE, PromoSchema, Promo };
