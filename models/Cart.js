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

    // Delete product
    async delete(objectId) {
        return await this.collection.deleteOne({ _id: objectId });
    }
}

module.exports = Cart;
