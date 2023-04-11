const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomersService {
  constructor() {}

  async create(data) {
    const response = await models.Customer.create(data, {
      include: ['user'],
    });
    return response;
  }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!response) {
      throw boom.notFound('Customer not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Customer successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Customer successfully deleted',
      id: id,
    };
  }
}

module.exports = CustomersService;
