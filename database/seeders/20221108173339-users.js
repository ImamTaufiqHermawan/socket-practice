'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Imam',
        lastName: 'Hermawan',
        email: 'imam.hermawan@gmail.com',
        password: 'secret',
        gender: 'male'
      },
      {
        firstName: 'Imam',
        lastName: 'Taufiq',
        email: 'imamtaufi@gmail.com',
        password: 'secret',
        gender: 'male'
      },
      {
        firstName: 'kikiki',
        lastName: 'ningsih',
        email: 'kikiki@gmail.com',
        password: 'secret',
        gender: 'female'
      }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};
