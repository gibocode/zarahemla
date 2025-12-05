const router = require("express").Router();
const cartController = require("../controllers/cartController");
const cartValidator = require("../middleware/cartValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Create cart
router.post(
    // #swagger.summary = 'Create a new cart'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    cartValidator.cartDataValidationRules(),
    cartValidator.checkCartData,
    cartController.createCart
);

// Delete cart by object ID
router.delete(
    // #swagger.summary = 'Delete a cart by ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    cartController.deleteCart
);

module.exports = router;
