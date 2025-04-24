const Meal = require('../models/meals');
const User = require('../models/users');

const addMeal = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const { calories, protein, carbs, fats } = req.body;

        // Create new meal
        const meal = new Meal({
            calories,
            protein,
            carbs,
            fats
        });

        // Save the meal
        const savedMeal = await meal.save();

        // Add meal to user's meals array
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { meals: savedMeal._id } }
        );

        res.status(201).json({
            message: 'Meal added successfully',
            meal: savedMeal
        });
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(500).json({ error: 'Failed to add meal' });
    }
};

const getTodayMeals = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const user = await User.findById(req.user._id).populate('meals');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Filter meals that are between today midnight and tomorrow midnight
        const todayMeals = user.meals.filter(meal => {
            const mealDate = new Date(meal.dateAdded);
            return mealDate >= today && mealDate < tomorrow;
        });

        const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);

        res.status(200).json({
            meals: todayMeals,
            totalCalories
        });
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
};

module.exports = {
    addMeal,
    getTodayMeals
};