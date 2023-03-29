const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const response = await models.User.create(data);
    return response;
  }

  async find() {
    const response = await models.User.findAll({
      // include: ['customer'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.User.findByPk(id);
    if (!response) {
      throw boom.notFound('Service not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'successfully deleted',
      id: id,
    };
  }
}

module.exports = UsersService;
