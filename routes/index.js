const router = require("express").Router();
const swaggerRoute = require("./swaggerRoute");
const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");

// Home Page
router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("Welcome to Zarahemla store home page!");
});

// Swagger Routes (API Documentation)
router.use("/", swaggerRoute);

// Product Routes
router.use("/products", productRoute);
// Category Routes
router.use("/categories", categoryRoute);

module.exports = router;
