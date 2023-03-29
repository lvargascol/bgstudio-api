//Usando consultas con sequilize

const boom = require('@hapi/boom');
// const pool = require('../libs/postgresPool');
// const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

//Logica temporal

class ServicesService {
  constructor() {
    this.services = [{ 'ruta de prueba': 'services' }]; //Mientras no se conecta a BD
  }

  async find() {
    const query = 'SELECT * FROM task';
    const [data, metadata] = await sequelize.query(query);
    return { data, metadata };
  }

  async findOne(id) {
    return { id };
  }

  async create(data) {
    return data;
  }

  async update(id, changes) {
    const response = await this.findOne(id);
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

//Logica "definitiva"

// class ServicesService {
//   constructor() {}

//   async create(data) {
//     const response = await models.Service.create(data);
//     return response;
//   }

//   async find() {
//     const response = await models.Service.findAll();
//     return response;
//   }

//   async findOne(id) {
//     const response = await models.Service.findByPk(id);
//     if (!response) {
//       throw boom.notFound('Service not found');
//     }
//     return response;
//   }

//   async update(id, changes) {
//     const response = await this.findOne(id);
//     await response.update(changes);
//     return {
//       message: 'successfully updated',
//       id: response.id,
//       ...changes,
//     };
//   }

//   async delete(id) {
//     const response = await this.findOne(id);
//     await response.destroy();
//     return {
//       message: 'successfully deleted',
//       id: id,
//     };
//   }
// }

module.exports = ServicesService;
