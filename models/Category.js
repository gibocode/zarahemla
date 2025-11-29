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

    async createCategory(category) {
        return await this.collection.insertOne(category);
    }

    async deleteCategory(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    async updateCategory(id, category) {
        return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: category });
    }
}

module.exports = Category;
