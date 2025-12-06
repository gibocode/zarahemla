const router = require("express").Router();
const cartController = require("../controllers/cartController");
const cartValidator = require("../middleware/cartValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Get all carts
router.get(    
    "/",
    cartController.getAllCarts
);

// Get all carts by user
router.get(    
    "/user/:username",
    cartController.getCartByUser
);

//GEt cart by cartId
router.get(
    "/:id",
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
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    cartValidator.cartDataValidationRules(),
    cartValidator.checkCartData,
    cartController.updateCart
)

// Delete cart by object ID
router.delete(
    // #swagger.summary = 'Delete a cart by ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    cartController.deleteCart
);

module.exports = router;
