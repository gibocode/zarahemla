const database = require("../database");

class User {

    // User model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("users");
    }

    // Get user by GitHub ID
    async getByGitHubId(gitHubId) {
        return await this.collection.findOne({ gitHubId: gitHubId });
    }

    // Create user
    async create(userData) {
        return await this.collection.insertOne(userData);
    }
}

module.exports = User;
