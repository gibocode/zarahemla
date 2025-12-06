const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid user ID." });
        }
        const objectId = new ObjectId(id);
        const user = new User();
        const result = await user.getByObjectId(objectId);
        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve user." });
    }
};

// Create user
const createUser = async (req, res) => {
    try {
        const data = req.body;
        const userData = {
            gitHubId: data.gitHubId,
            username: data.username,
            displayName: data.displayName
        };
        const user = new User();
        const result = await user.create(userData);
        if (result.insertedId) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "Could not create user.");
        }
    } catch (error) {
        return res.status(500).json({ message: "Could not create user." });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const user = new User();
        const result = await user.getAll();
        if (!result) {
            return res.status(404).json({ message: "Users not found." });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve users." });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid user ID." });
        }
        const user = new User();
        const result = await user.updateById(id, req.body);

        if (!result || result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not update user." });
    }
};


// Delete user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid user ID." });
        }
        const user = new User();
        const result = await user.deleteById(id);

        if (!result || result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not delete user." });
    }
};

module.exports = {
    getUserById,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
