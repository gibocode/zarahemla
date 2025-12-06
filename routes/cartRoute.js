const router = require("express").Router();
const cartController = require("../controllers/cartController");
const cartValidator = require("../middleware/cartValidator");
const { isAuthenticated } = require("../middleware/authenticate");


// Get all carts
router.get(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    cartController.getAllCarts
);

// Get all carts by user
router.get(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/user/:username",
    cartController.getCartByUser
);

// Create cart
router.post(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    cartValidator.cartDataValidationRules(),
    cartValidator.checkCartData,
    cartController.createCart
);

// Delete cart by object ID
router.delete(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    cartController.deleteCart
);

module.exports = router;