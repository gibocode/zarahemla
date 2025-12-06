const database = require("../database");

class Cart {

    // Cart model constructor
    constructor() {
        this.collection = database.getDatabase().db().collection("carts");
    }

    // Create cart
    async create(cartData) {
        return await this.collection.insertOne(cartData);
    }

    // Get all carts
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Get cart by user
    async getByUser(username) {
        return await this.collection.find({ username: username }).toArray();
    }

    // Get specific cart by object ID
    async getByObjectId(objectId) {
        return await this.collection.findOne({ _id: objectId });
    }

    // Update specific cart by object ID
    async update(objectId, cartData) {
        return await this.collection.updateOne({ _id: objectId }, { $set: cartData });
    }

    // Delete cart by object ID
    async delete(objectId) {
        return await this.collection.deleteOne({ _id: objectId });
    }
}

module.exports = Cart;
