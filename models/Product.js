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

    // Get product by object ID
    async getByObjectId(objectId) {
        return await this.collection.findOne({ _id: objectId });
    }

    // Create product
    async create(productData) {
        return await this.collection.insertOne(productData);
    }

    // Update product
    async update(objectId, productData) {
        return await this.collection.replaceOne({ _id: objectId }, productData);
    }
}

module.exports = Product;
