'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('invoices', [
    {
    account_id:1104,
    type:1,
    amount:1500,
    paid:false,
    createdAt:new Date(),
    updatedAt:new Date()
   },
   {
    account_id:1003,
    type:1,
    amount:120,
    paid:false,
    createdAt:new Date(),
    updatedAt:new Date()

   }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('invoices', null, {})
  }
};
