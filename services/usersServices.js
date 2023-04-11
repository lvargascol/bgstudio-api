const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const response = await models.User.create(data);
    return response;
  }

  async find() {
    const response = await models.User.findAll({
      // include: ['customer', 'specialist'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.User.findByPk(id, {
      include: ['customer', 'specialist'],
    });
    if (!response) {
      throw boom.notFound('User not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'User successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'User successfully deleted',
      id: id,
    };
  }
}

module.exports = UsersService;
