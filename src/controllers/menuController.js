const menuService = require('../services/menuService')

const getAllMenu = async (req, res) => {
    const menus = await menuService.getAllMenu();
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: menus
    })
}

const getMenuByRole = async (req, res) => {
    // const data = await getValue("menu"); 
    // if(data){
    //     return res.status(200).json({
    //         EC: 0,
    //         EM: "",
    //         DT: data
    //     })
    // }
    const menus = await menuService.getMenuByRole(req.params.roleName);
    //await setValue("menu", menus);
    return res.status(200).json({
        EC: 0,
        EM: "",
        DT: menus
    })
}

module.exports = { getAllMenu, getMenuByRole }; 