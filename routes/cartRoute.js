const router = require("express").Router();
const cartController = require("../controllers/cartController");
const cartValidator = require("../middleware/cartValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Create cart
router.post(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    cartValidator.cartDataValidationRules(),
    cartValidator.checkCartData,
    cartController.createCart
);

module.exports = router;
