const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SpecialistsService {
  constructor() {}

  async create(data) {
    const response = await models.Specialist.create(data, {
      include: ['user'],
    });
    return response;
  }

  async find() {
    const response = await models.Specialist.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Specialist.findByPk(id, {
      include: ['user'],
    });
    if (!response) {
      throw boom.notFound('Specialist not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Specialist successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Specialist successfully deleted',
      id: id,
    };
  }
}

module.exports = SpecialistsService;
