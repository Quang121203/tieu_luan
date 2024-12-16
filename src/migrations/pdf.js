'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pdf', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName:{
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING
      },
      describe: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT('long')
      },
      fileName:{
        type: Sequelize.STRING
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

    await queryInterface.addIndex('Pdf', {
      fields: ['text'],
      type: 'FULLTEXT',
      name: 'text_idx'
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pdf');
  }
};