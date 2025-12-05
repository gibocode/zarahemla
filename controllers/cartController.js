const Cart = require("../models/Cart");

// Create cart
const createCart = async (req, res) => {
    try {
        const data = req.body;
        const user = req.session.user;
        const cartData = {
            cartId: data.cartId,
            username: user.username,
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

module.exports = { createCart };
