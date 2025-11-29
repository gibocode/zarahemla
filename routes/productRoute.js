const router = require("express").Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by object ID
router.get("/:id", productController.getProductById);

module.exports = router;
