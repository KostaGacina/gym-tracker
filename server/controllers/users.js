const User = require('../models/users');
const passport = require('passport');

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        await User.register(new User({ email, username }), password);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Controller for logging in a user
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(500).json({ error: 'Authentication error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ error: 'Login error' });
            }
            res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
};

const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ error: 'Failed to log out' });
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};