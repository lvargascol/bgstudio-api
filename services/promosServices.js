const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PromosService {
  constructor() {}

  async create(data) {
    const response = await models.Promo.create(data);
    return response;
  }

  async find() {
    const response = await models.Promo.findAll({});
    return response;
  }

  async findOne(id) {
    const response = await models.Promo.findByPk(id);
    if (!response) {
      throw boom.notFound('Promo not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Promo successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Promo successfully deleted',
      id: id,
    };
  }
}

module.exports = PromosService;
