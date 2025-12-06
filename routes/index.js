const router = require("express").Router();
const authenticationRoute = require("./authenticationRoute");
const swaggerRoute = require("./swaggerRoute");
const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const userRoute = require("./userRoute");
const cartRoute = require("./cartRoute");

// Homepage Route
router.get("/", (req, res) => {
    // #swagger.ignore = true
    let message = `
        <style>
            span {
                font-weight: 700;
                color: #008CBA;
            }
            a {
                color: white;
                text-decoration: none;
                padding: 7px 14px;
                margin-top: 5px;
                display: inline-block;
                border-radius: 5px;
            }
        </style>
        <div>Welcome to Zarahemla Store! <a href="/api-docs" style="background-color: #555555">API Documentation</a></div>`;
    if (req.session.user !== undefined) {
        message += `<div>You are logged in as <span>${req.session.user.displayName}</span>
            <a href="/auth/logout" style="background-color: #f44336;">Logout</a></div>`;
    } else {
        message += `<div>You are currently logged out.
            <a href="/auth/login" style="background-color: #04AA6D">GitHub OAuth Login</a></div>`;
    }
    res.send(message);
});

// Authentication Routes
router.use(
    // #swagger.ignore = true
    "/auth",
    authenticationRoute
);

// Swagger Routes (API Documentation)
router.use(
    // #swagger.ignore = true
    "/",
    swaggerRoute
);

// Product Routes
router.use(
    // #swagger.tags = ['Products']
    "/products",
    productRoute
);

// Category Routes
router.use(
    // #swagger.tags = ['Categories']
    "/categories",
    categoryRoute
);

// User Routes
router.use(
    // #swagger.tags = ['Users']
    "/users",
    userRoute
);

// Cart Routes
router.use(
    // #swagger.tags = ['Carts']
    "/carts",
    cartRoute
);

module.exports = router;
