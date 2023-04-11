const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class StocksService {
  constructor() {}

  async create(data) {
    const response = await models.Stock.create(data);
    return response;
  }

  async addConsumable(data) {
    const stock = await models.Stock.findByPk(data.stockId);
    if (stock.type === 'consumable') {
      const response = await models.ConsumableStock.create(data);
      return response;
    } else {
      throw boom.badRequest('Stock is not type Consumable');
    }
  }

  async addProduct(data) {
    const stock = await models.Stock.findByPk(data.stockId);
    if (stock.type === 'product') {
      const response = await models.ProductStock.create(data);
      return response;
    } else {
      throw boom.badRequest('Stock is not type Product');
    }
  }

  async find() {
    const response = await models.Stock.findAll({
      // include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Stock.findByPk(id, {
      include: ['consumables','products'],
    });
    if (!response) {
      throw boom.notFound('Stock not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Stock successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Stock successfully deleted',
      id: id,
    };
  }
}

module.exports = StocksService;
