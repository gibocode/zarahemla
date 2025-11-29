const database = require("../database");

class Category {

    // Category model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("categories");
    }

    // Get all categories
    async getAll() {
        return await this.collection.find().toArray();
    }
}

module.exports = Category;
