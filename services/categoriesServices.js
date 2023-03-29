const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class CategoriesService {

  constructor(){}

  async create(data) {
    const response = await models.Category.create(data);
    return response;
  };

  async find() {
    const response = await models.Category.findAll();
    return response;
  };

  async findOne(id) {
    const response = await models.Category.findByPk(id,{
      include: ['products']
    });
    if (!response) {
      throw boom.notFound('Not found');
    }
    return response;
  };


  async update(id,changes) {
    const response = await this.findOne(id);
    await response.update(changes);
    return {
      message: "Successfully updated",
      id: response.id,
      ...changes
    }
  };

  async delete(id) {
    const response = await this.findOne(id);
    await response.destroy();
    return {
      message: "Successfully deleted",
      id: id
    }
  };
};

module.exports = CategoriesService;
