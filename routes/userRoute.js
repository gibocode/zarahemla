const router = require("express").Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authenticate");
const userValidator = require("../middleware/userValidator");



router.get("/", userController.getAllUsers);
router.get("/:id", isAuthenticated, userController.getUserById);
router.post("/", isAuthenticated, userValidator.userCreateDataValidationRules(), userValidator.checkUserData, userController.createUser);
router.put("/:id", isAuthenticated, userValidator.userUpdateDataValidationRules(), userValidator.checkUserData, userController.updateUser);
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
