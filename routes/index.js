const router = require("express").Router();
const swaggerRoute = require("./swaggerRoute");

// Home Page
router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.send("Welcome to Zarahemla store home page!");
});

// Swagger Routes (API Documentation)
router.use("/", swaggerRoute);

module.exports = router;
