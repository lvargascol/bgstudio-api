const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomersService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };
    const response = await models.Customer.create(newData, {  
      include: ['user'],
    });
    delete response.user.dataValues.password;
    return response;
  }


  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });

    response.forEach(customer => {
      delete customer.user.dataValues.password;
    });
    return response;
  }

  async findOne(id,user) {
    const response = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!response) {
      throw boom.notFound('Customer not found');
    };
    if ((response.user.id != user.sub) && (user.role === 'customer')) {
      throw boom.unauthorized();
    } 
    delete response.user.dataValues.password;
    return response;
  }

  async checkOne(id) {
    const response = await models.Customer.findByPk(id);
    if (!response) {
      throw boom.notFound('Customer not found');
    };
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
