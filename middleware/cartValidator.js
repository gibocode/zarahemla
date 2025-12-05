const { body, validationResult } = require("express-validator")
const validate = {}

// Validation rules for product data
validate.cartDataValidationRules = () => {
    return [
        body("cartId")
            .trim()
            .notEmpty()
            .isString()
            .withMessage("Cart ID is required."),
        body("username")
            .trim()
            .notEmpty()
            .isString()
            .withMessage("Username is required."),
        body("cartItems")
            .isArray()
            .withMessage("Cart items must be in array format."),
    ]
};

// Middleware to check for validation errors
validate.checkCartData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
};

module.exports = validate