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

            // Check if user has stats and plan
            const hasCompletedSetup = user.stats && user.activePlan;

            res.status(200).json({
                message: 'Login successful',
                user,
                hasCompletedSetup
            });
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

const enterStats = async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        // Get stats from request body
        const { sex, age, height, weight, bodyFatPercentage } = req.body;

        // Update the current user's stats
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                stats: {
                    sex,
                    age,
                    height,
                    weight,
                    bodyFatPercentage
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Stats updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating stats:', error);
        res.status(500).json({ error: 'Failed to update stats' });
    }
};

const choosePlan = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const { activePlan } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { activePlan },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Plan updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating plan:', error);
        res.status(500).json({ error: 'Failed to update plan' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    enterStats,
    choosePlan,
};