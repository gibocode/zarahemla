const { body, validationResult } = require("express-validator")
const validate = {}

// Validation rules for product data
validate.productDataValidationRules = () => {
    return [
        body("productId")
            .trim()
            .notEmpty().withMessage("Product ID is required."),
        body("productName")
            .trim()
            .notEmpty().withMessage("Product name is required."),
        body("productDescription")
            .trim()
            .notEmpty().withMessage("Product description is required."),
        body("productColor")
            .trim()
            .notEmpty().withMessage("Product color is required."),
        body("productBrand")
            .trim()
            .notEmpty().withMessage("Product brand is required."),
        body("productPrice")
            .isFloat({ gt: 0 }).withMessage("Product price must be a number greater than 0."),
        body("productImage")
            .trim()
            .notEmpty().withMessage("Product image URL is required.")
    ]
};

// Middleware to check for validation errors
validate.checkProductData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
};

module.exports = validate
