const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const response = await models.Product.create(data, {
      include: ['category'],
    });
    return response;
  }

  async find() {
    const response = await models.Product.findAll({
      include: ['category'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!response) {
      throw boom.notFound('Product not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Product successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Product successfully deleted',
      id: id,
    };
  }
}

module.exports = ProductsService;
