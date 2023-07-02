'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
