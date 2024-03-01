//Usando consultas con sequilize

const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ServicesService {
  constructor() {}

  async create(data) {
    const response = await models.Service.create(data);
    return response;
  }

  async find() {
    const response = await models.Service.findAll({      
      include: ['category'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Service.findByPk(id, {      
      include: ['category'],
    });
    if (!response) {
      throw boom.notFound('Service not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Service successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Service successfully deleted',
      id: id,
    };
  }
}

module.exports = ServicesService;
