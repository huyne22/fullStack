'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      password: 'luonghuy2k2',
      firstName: 'Luong',
      lastName: 'Huy',
      address: 'Hoidanit',
      phoneNumber: '0367304511',
      gender: 1,
      image: '',
      roleId: 'ROLE',
      positionId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  }
}
