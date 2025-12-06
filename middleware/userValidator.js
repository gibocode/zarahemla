
const { body, validationResult } = require("express-validator")
const validate = {}

// Validation rules for user create data
validate.userCreateDataValidationRules = () => {
    return [
        body("gitHubId")
            .trim()
            .notEmpty().withMessage("GitHub ID is required."),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required."),
        body("displayName")
            .trim()
            .notEmpty().withMessage("Display name is required."),
    ]
};

// Validation rules for user update data
validate.userUpdateDataValidationRules = () => {
    return [
        body("gitHubId")
            .trim()
            .notEmpty().withMessage("GitHub ID is required."),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required."),
        body("displayName")
            .trim()
            .notEmpty().withMessage("Display name is required."),
    ]
};


// Middleware to check for validation errors
validate.checkUserData = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
};

module.exports = validate
