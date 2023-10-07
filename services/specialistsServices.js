const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class SpecialistsService {
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
    const response = await models.Specialist.create(newData, {
      include: ['user'],
    });
    delete response.user.dataValues.password;
    return response;
  }

  async find() {
    const response = await models.Specialist.findAll({
      include: ['user'],
    });
    response.forEach(specialist => {
      delete specialist.user.dataValues.password;
    });
    return response;
  }

  async findOne(id) {
    const response = await models.Specialist.findByPk(id, {
      include: ['user','services'],
    });
    if (!response) {
      throw boom.notFound('Specialist not found');
    };
    delete response.user.dataValues.password;
    return response;
  }

  async addService(data) {
    const response = await models.SpecialistService.create(data);
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

  async removeService(id) {
    const response = await models.SpecialistService.findByPk(id);
    if (!response) {
      throw boom.notFound('Service not found');
    }
    await response.destroy();
    return {
      message: 'Service successfully removed',
      id: id,
    };
  }  

}



module.exports = SpecialistsService;
