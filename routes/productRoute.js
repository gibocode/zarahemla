const router = require("express").Router();
const productController = require("../controllers/productController");
const productValidator = require("../middleware/productValidator");
const { isAuthenticated } = require("../middleware/authenticate");

// Get all products
router.get(
    // #swagger.summary = 'Retrieve all products'
    "/",
    productController.getAllProducts
);

// Get one product by object ID
router.get(
    // #swagger.summary = 'Retrieve a product by Object ID'
    "/:id",
    productController.getProductById
);

// Create product
router.post(
    // #swagger.summary = 'Create a new product'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    productValidator.productDataValidationRules(),
    productValidator.checkProductData,
    productController.createProduct
);

// Update product by object ID
router.put(
    // #swagger.summary = 'Update an existing product by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    productValidator.productDataValidationRules(),
    productValidator.checkProductData,
    productController.updateProduct
);

// Delete product by object ID
router.delete(
    // #swagger.summary = 'Delete a product by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    productController.deleteProduct
);

module.exports = router;
