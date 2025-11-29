const database = require("../database");
const { ObjectId } = require("mongodb");

class Category {

    // Category model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("categories");
    }

    // Get all categories
    async getAll() {
        return await this.collection.find().toArray();
    }

    // Get category by id
    async getById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
}

module.exports = Category;
