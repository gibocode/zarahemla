const Cart = require("../models/Cart");
const ObjectId = require("mongodb").ObjectId;

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

// Get cart by user
const getCartByUser = async (req, res) => {
    try {
        const username = req.params.username;
        const carts = new Cart();
        const userCarts = await carts.getByUser(username);

        if (userCarts.length === 0) {
            return res.status(404).json({ message: "No carts found for this user." });
        }
        res.status(200).json(userCarts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not retrieve carts for user." });
    }   
};

//Get cart by Id
const getCartById = async (req, res) => {
    try {
        const cartId = req.params.id;
        const carts = new Cart();
        const cart = await carts.getById(cartId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        } res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve specific cart."});
    }
};

//update cart
const updateCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const data = req.body;
        const cartData = {
            cartId: data.cartId,
            username: data.username,
            cartItems: data.cartItems,
        };
        const cart = new Cart();
        const result = await cart.update(cartId, cartData);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        }
    } catch (error) {
        return res.status(500).json({ message: "Could not update cart." });
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

module.exports = { getAllCarts, getCartByUser, getCartById, createCart, updateCart, deleteCart };
