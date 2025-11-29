const dotenv = require("dotenv");
dotenv.config();

const client = require("mongodb").MongoClient;

let database;

// Initialize the database connection
const initialize = (callback) => {
    if (database) {
        console.warn("Database is already initialized!");
        return callback(null, database);
    }
    client.connect(process.env.MONGODB_URI)
        .then((dbClient) => {
            database = dbClient;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

// Get the database instance
const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized.");
    }
    return database;
};

module.exports = { initialize, getDatabase };
