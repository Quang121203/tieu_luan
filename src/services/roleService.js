const db = require("../models/index.js");

const getRolesByUser = async (userID) => {
  return await db.Role.findAll({
    include: {
      model: db.User,
      where: {
        id: userID
      },
    },
  });
}

const createRoleUser = async (userID, roleID) => {
  return await db.RoleUser.create({ userID, roleID });
}

const getAllRole = async () => {
  return await db.Role.findAll();
}

const deleteUserRole = async (userID) => {
  return await db.RoleUser.destroy({
    where: {
      userID: userID,
    },
  });
}

const deleteRoleUser = async (roleID) => {
  return await db.RoleUser.destroy({
    where: {
      roleID: roleID,
    },
  });
}

const deleteRoleMenu = async (roleID) => {
  return await db.RoleMenu.destroy({
    where: {
      roleID: roleID,
    },
  });
}

const updateUserRole = async (data, userID) => {
  await deleteUserRole(userID);
  return await db.RoleUser.bulkCreate(data);
}

const updateRoleUser = async (data, roleID) => {
  await deleteRoleUser(roleID);
  return await db.RoleUser.bulkCreate(data);
}

const updateRoleMenu = async (data, roleID) => {
  await deleteRoleMenu(roleID);
  return await db.RoleMenu.bulkCreate(data);
}

const addRole = async (name) => {
  return await db.Role.create({ name });
}

const getRoleByName = async (name) => {
  const role = await db.Role.findOne({ where: { name } });
  if (role === null) {
    return false;
  } else {
    return role;
  }
}

const deleteRole = async (roleID) => {
  await deleteRoleMenu(roleID);
  await deleteRoleUser(roleID);
  return await db.Role.destroy({
    where: {
      id: roleID
    },
  });
}

const updateRole = async (role) => {
  return await db.Role.update(
    { name: role.name },
    {
      where: {
        id: role.id
      },
    },
  );
}


module.exports = {
  getRolesByUser, createRoleUser, getAllRole, deleteRoleUser, updateRoleUser, updateUserRole,
  updateRoleMenu, addRole, getRoleByName, deleteRole, updateRole
} 