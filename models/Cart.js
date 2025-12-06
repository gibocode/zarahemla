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

    //Get All
    async getAll() {
        return await this.collection.find({}).toArray();
    }

    // Get by user
    async getByUser(username) {
        return await this.collection.find({ username: username }).toArray();
    }

    //Get Especific Cart by cartID
    async getById(cartId) {
        return await this.collection.findOne({ cartId: cartId });
    }

    //Update specific Cart by cartId
    async update(cartId, cartData) {
        return await this.collection.updateOne({ cartId: cartId }, { $set: cartData });
    }

    // Delete product
    async delete(objectId) {
        return await this.collection.deleteOne({ _id: objectId });
    }
}

module.exports = Cart;
