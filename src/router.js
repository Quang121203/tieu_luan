const express = require('express')
const router = express.Router()
const upload = require("./config/multerConfig");

const  ocrController = require('./controllers/ocrController');
const userController = require('./controllers/userController');
const pdfController = require('./controllers/pdfController');
const menuController = require('./controllers/menuController');
const roleController = require('./controllers/roleController');

const { checkUser,checkPremistion } = require('./middleware/jwtActions'); 

//admin ==========================================================================
router.post("/ocr",upload.single("file"), ocrController);

router.post('/pdf', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), pdfController.uploadPdf);

//auth =================================================================================
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);

//pdf =================================================================================
router.post("/findpdf", checkUser, pdfController.findPDF);
router.get("/viewpdf/:fileName", checkUser, pdfController.viewPDF);
router.get("/pdf", checkUser, pdfController.getAllPDF); //admin
router.get("/pdf/:id", checkUser, pdfController.getPDFById);
router.delete("/pdf/:fileName", checkUser, pdfController.deletePDF); //admin
router.put("/pdf/", checkUser, pdfController.updatePDF); //admin

//user =================================================================================
router.get("/info", checkUser, userController.getInformations);
router.delete("/users/:id", checkUser, userController.deleteUser); //admin
router.get("/users", checkUser, userController.getAllUsers); //admin
router.put("/users", checkUser, userController.updateUser); //admin
router.get("/users/:id", checkUser, userController.getUserById);
router.get("/users/role/:id", checkUser, userController.getUserByRole);

//menu =====================================================================================
router.get("/menu", checkUser, menuController.getAllMenu);
router.get("/menu/:roleName", checkUser, menuController.getMenuByRole);

//role ==============================================================================
router.get("/role", checkUser, roleController.getAllRole); //admin
router.put("/role", checkUser, roleController.updateUserRole); //admin
router.put("/role/user", checkUser, roleController.updateRoleUser); //admin
router.put("/role/menu", checkUser, roleController.updateRoleMenu); //admin
router.post("/role", checkUser, roleController.addRole); //admin
router.delete("/role/:id", checkUser, roleController.deleteRole); //admin
router.put("/role/name", checkUser, roleController.updateRole); //admin

module.exports = router