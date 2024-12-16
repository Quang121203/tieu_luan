const db = require("../models/index.js");
const bcrypt = require('bcrypt');

const getUser = async (username) => {
    const user = await db.User.findOne({ where: { username } });
    if (user === null) {
        return false;
    } else {
        return user;
    }
}

const hashPass = (pass) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newPass = bcrypt.hashSync(pass, salt);
    return newPass;
}

const checkPass = (pass, newPass) => {
    return bcrypt.compareSync(pass, newPass);
}

const createUser = async (user) => {
    return await db.User.create({ ...user });
}

const getAllUsers = async () => {
    const users= await db.User.findAll({
        include: {
            model: db.Role,
        },
    });
    return users.sort((a, b) => b.createdAt - a.createdAt);
}

const deleteUser = async (id) => {
    return await db.User.destroy({
        where: {
            id
        },
    });
}

const getUserById = async (id) => {
    const user = await db.User.findOne({ where: { id } });
    if (user === null) {
        return false;
    } else {
        return user;
    }
}

const updateUser = async (user) => {
    return await db.User.update(
        { username: user.username },
        {
            where: {
                id: user.id
            },
        },
    );
}

const getUserByRole = async (id) => {
    return await db.User.findAll({
        include: {
            model: db.Role,
            where: {
                id: id
            },
        },
    });
}

module.exports = { getUser, hashPass, checkPass, createUser, getAllUsers, deleteUser, getUserById, updateUser, getUserByRole };