const Cart = require("../models/Cart");
const ObjectId = require("mongodb").ObjectId;


// GET ALL CARTS
const getAllCarts = async (req, res) => {
    try {
        const carts = new Cart();
        const allCarts = await carts.getAll();
        res.status(200).json(allCarts);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve all carts." });
    }
}

// Create cart
const createCart = async (req, res) => {
    try {
        const data = req.body;
        const cartData = {
            cartId: data.cartId,
            username: data.username,
            cartItems: data.cartItems,
        };
        const cart = new Cart();
        const result = await cart.create(cartData);
        if (result.insertedId) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "Could not create cart.");
        }
    } catch (error) {
        return res.status(500).json({ message: "Could not create cart." });
    }
};

// Delete cart
const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid cart ID." });
        }
        const objectId = new ObjectId(id);
        const cart = new Cart();
        const result = await cart.delete(objectId);
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(result.error || 'Cart not found.');
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Could not delete cart." });
    }
};

module.exports = { getAllCarts, createCart, deleteCart };