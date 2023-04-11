const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ConsumablesService {
  constructor() {}

  async create(data) {
    const response = await models.Consumable.create(data);
    return response;
  }

  async find() {
    const response = await models.Consumable.findAll({
      // include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Consumable.findByPk(id);
    if (!response) {
      throw boom.notFound('Consumable not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Consumable successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Consumable successfully deleted',
      id: id,
    };
  }
}

module.exports = ConsumablesService;
