const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const response = await models.User.create({ ...data, password: hash });
    delete response.dataValues.password;
    return response;
  }

  async find() {
    const response = await models.User.findAll({
      // include: ['customer', 'specialist'],
    });
    response.forEach(user => {
      delete user.dataValues.password;
    });
    return response;
  }

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email },
    });
    return response;
  }

  async findOne(id) {
    const response = await models.User.findByPk(id, {
      include: ['customer', 'specialist'],
    });
    if (!response) {
      throw boom.notFound('User not found');
    };
    // delete response.dataValues.password;
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    console.log(changes.password);
    const hash = changes.password ? await bcrypt.hash(changes.password, 10) : response.password;
    await response.update({ ...changes, password: hash });
    const message = changes.password ? {
      message: 'Password successfully updated',
      id: response.id,
    } : {
      message: 'User successfully updated',
      id: response.id,
      ...changes,
    };
    return message;
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
