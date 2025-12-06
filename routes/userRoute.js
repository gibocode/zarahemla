const router = require("express").Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authenticate");
const userValidator = require("../middleware/userValidator");

// Get all users
router.get(
    // #swagger.summary = 'Retrieve all users'
    "/",
    userController.getAllUsers
);

// Get one user by object ID
router.get(
    // #swagger.summary = 'Retrieve a user by Object ID'
    "/:id",
    isAuthenticated,
    userController.getUserById
);

// Create user
router.post(
    // #swagger.summary = 'Create a new user'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    userValidator.userCreateDataValidationRules(),
    userValidator.checkUserData,
    userController.createUser
);

// Update user by object ID
router.put(
    // #swagger.summary = 'Update an existing user by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    userValidator.userUpdateDataValidationRules(),
    userValidator.checkUserData,
    userController.updateUser
);

// Delete user by object ID
router.delete(
    // #swagger.summary = 'Delete a user by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    userController.deleteUser
);

module.exports = router;
