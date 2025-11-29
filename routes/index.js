const router = require("express").Router();
const swaggerRoute = require("./swaggerRoute");
const productRoute = require("./productRoute");

// Home Page
router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("Welcome to Zarahemla store home page!");
});

// Swagger Routes (API Documentation)
router.use("/", swaggerRoute);

// Product Routes
router.use("/products", productRoute);

module.exports = router;
