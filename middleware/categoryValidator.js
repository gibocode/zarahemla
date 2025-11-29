const { body, validationResult } = require("express-validator")
const validate = {}

// Validation rules for category create data
validate.categoryCreateDataValidationRules = () => {
    return [
        body("categoryId")
            .trim()
            .matches(/^[A-Z0-9]{3}$/i)
            .withMessage("Category ID must be exactly 3 alphanumeric characters."),
        body("categoryName")
            .trim()
            .notEmpty().withMessage("Category name is required."),
        body("categoryDescription")
            .trim()
            .notEmpty().withMessage("Category description is required."),
    ]
};

// Middleware to check for validation errors
validate.checkCategoryData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
};

module.exports = validate
