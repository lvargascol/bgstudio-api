const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}

  async create(data) {
    const response = await models.Order.create(data);
    return response;
  }

  async addItem(data) {
    const response = await models.OrderProduct.create(data);
    return response;
  }

  async findByUser(userId) {
    const response = await models.Order.findAll({
      where: { '$user.id$': userId },
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
      ],
    });
    response.forEach(order => {
      delete order.user.dataValues.password;
    });
    return response;
  }


  async find() {
    const response = await models.Order.findAll({
      // include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Order.findByPk(id, {
      // include: ['user'],
      include: [
        {
          association: 'user',
          include: ['customer'],
        },
        'products',
      ],
    });
    if (!response) {
      throw boom.notFound('Order not found');
    }
    return response;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: 'Order successfully updated',
      id: response.id,
      ...changes,
    };
  }

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: 'Order successfully deleted',
      id: id,
    };
  }
}

module.exports = OrdersService;
