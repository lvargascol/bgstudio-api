const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PaymentsService {
  constructor() {}

  async create(data) {
    const response = await models.Payment.create(data);
    return response;
  }

  async find() {
    const response = await models.Payment.findAll({});
    return response;
  }

  async findOne(id) {
    const response = await models.Payment.findByPk(id);
    if (!response) {
      throw boom.notFound('Payment not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Payment successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Payment successfully deleted',
      id: id,
    };
  }
}

module.exports = PaymentsService;
