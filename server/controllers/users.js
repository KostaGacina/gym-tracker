const User = require('../models/users'); // Import the User model

// Controller for registering a user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({ username, password });
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

module.exports = {
    registerUser,
};