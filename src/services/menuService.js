const db = require("../models/index.js");

const getAllMenu = async () => {
    return await db.Menu.findAll();
}

const getMenuByRole = async (roleName) => {
    return await db.Menu.findAll({
      include: {
        model: db.Role,
        where: {
          name: roleName
        },
      },
    });
  }

module.exports = { getAllMenu,getMenuByRole};