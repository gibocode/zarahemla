const router = require("express").Router();
const productController = require("../controllers/productController");
const productValidator = require("../middleware/productValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by object ID
router.get("/:id", productController.getProductById);

// Create product
router.post(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    productValidator.productDataValidationRules(),
    productValidator.checkProductData,
    productController.createProduct
);

// Update product by object ID
router.put(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    productValidator.productDataValidationRules(),
    productValidator.checkProductData,
    productController.updateProduct
);

// Delete product by object ID
router.delete(
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    productController.deleteProduct
);

module.exports = router;
