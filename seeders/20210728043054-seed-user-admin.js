'use strict';
const { hashPassword } = require('../helpers/password-helpers')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      nik: '123456789',
      role: 'admin',
      email: 'admin@mail.com',
      password: hashPassword('123456'),
      address: 'Jl. Jeruk No. 2 Jakarta',
      phone_number: '081211223344',
      dob: '1996-06-06',
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
