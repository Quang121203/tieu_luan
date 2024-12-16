'use strict';
const userServices = require('../services/userService');

const password = userServices.hashPass("123456");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [{
      id: 1,
      username: 'admin',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Role', [{
      id: 1,
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('RoleUser', [{
      roleID: 1,
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('Menu', [{
      id: 1,
      name: "User",
      link: "user",
      icon: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "PDF",
      link: "pdf",
      icon: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Search",
      link: "search",
      icon: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "OCR",
      link: "ocr",
      icon: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: "Role",
      link: "role",
      icon: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});


    await queryInterface.bulkInsert('RoleMenu', [{
      roleID: 1,
      menuID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleID: 1,
      menuID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleID: 1,
      menuID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleID: 1,
      menuID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roleID: 1,
      menuID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      roleID: 2,
      menuID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};