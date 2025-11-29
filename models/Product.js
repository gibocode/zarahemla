const database = require("../database");

class Product {

    // Product model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("products");
    }

    // Get all products
    async getAll() {
        return await this.collection.find().toArray();
    }
}

module.exports = Product;
