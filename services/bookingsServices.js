const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BookingsService {
  constructor() {}

  async create(data) {
    const response = await models.Booking.create(data);
    return response;
  }

  async find() {
    const response = await models.Booking.findAll({
      // include: ['customer'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Booking.findByPk(id);
    if (!response) {
      throw boom.notFound('Booking not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Booking successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Booking successfully deleted',
      id: id,
    };
  }
}

module.exports = BookingsService;
