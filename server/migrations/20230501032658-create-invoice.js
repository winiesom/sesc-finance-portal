'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: "accounts",
          key: "student_id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      book_id: {
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoices');
  }
};