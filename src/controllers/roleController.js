const roleServices = require('../services/roleService');

const getAllRole = async (req, res) => {
    const roles = await roleServices.getAllRole();
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: roles
    })
}

const updateUserRole = async (req, res) => {
    await roleServices.updateRoleUser(req.body.data, req.body.userID);
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: ""
    })
}

const updateRoleUser = async (req, res) => {
    await roleServices.updateRoleUser(req.body.data, req.body.roleID);
    return res.status(200).json({
        EC: 0,
        EM: "Update successful",
        DT: ""
    })
}

const updateRoleMenu = async (req, res) => {
    await roleServices.updateRoleMenu(req.body.data, req.body.roleID);
    return res.status(200).json({
        EC: 0,
        EM: "Update successful",
        DT: ""
    })
}

const addRole = async (req, res) => {
    const role = await roleServices.getRoleByName(req.body.name);
    if (role) {
        return res.status(200).json({
            EC: 1,
            EM: "Name already exists",
            DT: ""
        })
    }

    await roleServices.addRole(req.body.name);
    return res.status(200).json({
        EC: 0,
        EM: "Add successful",
        DT: ""
    })
}

const deleteRole = async (req, res) => {
    const id = req.params.id;
    await roleServices.deleteRole(id);
    return res.status(200).json({
        EC: 0,
        EM: "Delete successfully",
        DT: ""
    })
}

const updateRole = async (req, res) => {
    await roleServices.updateRole(req.body);
    return res.status(200).json({
        EC: 0,
        EM: "Update successful",
        DT: ""
    });
}

module.exports = { getAllRole, updateUserRole, updateRoleUser, updateRoleMenu, addRole, deleteRole, updateRole }