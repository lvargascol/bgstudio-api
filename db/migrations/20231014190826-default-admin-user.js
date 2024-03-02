'use strict';
const bcrypt = require('bcrypt');
const {
  USER_TABLE,
} = require('./../models/userModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const hash = await bcrypt.hash('clave1234', 10);

    await queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'lvargascol@gmail.com',
        password: hash,
        role: 'admin',
        created_at: new Date()
      }
    ]);   
  },

  async down (queryInterface, Sequelize) {

    // await queryInterface.bulkDelete(USER_TABLE, 
    //   {
    //     id: 1,
    //   })

  }
};
