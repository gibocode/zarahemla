const router = require("express").Router();
const productController = require("../controllers/productController");
const productValidator = require("../middleware/productValidator");

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by object ID
router.get("/:id", productController.getProductById);

// Create product
router.post(
    "/",
    productValidator.productDataValidationRules(),
    productValidator.checkProductData,
    productController.createProduct
);

module.exports = router;
