const database = require("../database");

class User {

    // User model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("users");
    }

    // Get user by object ID
    async getByObjectId(objectId) {
        return await this.collection.findOne({ _id: objectId });
    }

    // Get user by GitHub ID
    async getByGitHubId(gitHubId) {
        return await this.collection.findOne({ gitHubId: gitHubId });
    }

    // Create user
    async create(userData) {
        return await this.collection.insertOne(userData);
    }

    // Get all users
    async getAll() {
        return await this.collection.find().toArray();
    }

    // Update user by object ID
    async updateById(id, userData) {
        return await this.collection.updateOne({ _id: id }, { $set: userData });
    }

    // Delete user by object ID
    async deleteById(id) {
        return await this.collection.deleteOne({ _id: id });
    }
}

module.exports = User;
