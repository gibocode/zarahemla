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
}

module.exports = Cart;
