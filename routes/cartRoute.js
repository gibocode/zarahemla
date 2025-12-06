const router = require("express").Router();
const cartController = require("../controllers/cartController");
const cartValidator = require("../middleware/cartValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Get all carts
router.get(
    // #swagger.summary = 'Retrieve all carts'
    "/",
    cartController.getAllCarts
);

// Get all carts by user
router.get(
    // #swagger.summary = 'Retrieve all carts from a user based on username'
    "/user/:username",
    cartController.getCartByUser
);

// Get cart by cartId
router.get(
    // #swagger.summary = 'Retrieve cart by cart ID'
    "/:cartId",
    cartController.getCartById
)

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

router.put(
    // #swagger.summary = 'Update an existing cart by cart ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:cartId",
    isAuthenticated,
    cartValidator.cartDataValidationRules(),
    cartValidator.checkCartData,
    cartController.updateCart
)

// Delete cart by object ID
router.delete(
    // #swagger.summary = 'Delete a cart by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    cartController.deleteCart
);

module.exports = router;
