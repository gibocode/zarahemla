const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json())

// Main Routes
   .use("/", require("./routes"));

// Default error handling
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
