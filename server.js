const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");

app.use(bodyParser.json())

    // Header
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use(cors({ methods: ["GET", "POST", "PUT", "UPDATE", "DELETE", "PATCH"]}))
    .use(cors({ origin: "*" }))

    // Main Routes
   .use("/", require("./routes"));

// Default error handling
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
});

// Initialize database and start server
database.initialize((err) => {
    if (err) {
        console.error(err);
    }
    else {
        const port = process.env.APP_PORT || 3000;
        app.listen(port, () => {
            console.log(`Database connected and server is running on port ${port}`);
        });
    }
});
