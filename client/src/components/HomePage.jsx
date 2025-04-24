import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import DonutMacroChart from './DonutMacroChart';

axios.defaults.withCredentials = true;

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [calorieIntake, setCalorieIntake] = useState(null);
    const [dailyCalories, setDailyCalories] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Function to check if it's a new day
    const isNewDay = () => {
        const now = new Date();
        const lastUpdateDay = new Date(lastUpdate);

        // Reset hour/minute/second to midnight for comparison
        now.setHours(0, 0, 0, 0);
        lastUpdateDay.setHours(0, 0, 0, 0);

        return now.getTime() > lastUpdateDay.getTime();
    };

    const calculateCalorieIntake = (user) => {
        if (!user?.stats) return null;

        const { sex, age, height, weight } = user.stats;
        const genderConstant = sex ? 5 : -161; // true for male, false for female

        // Calculate BMR using the formula
        const bmr = (10 * weight) + (6.25 * height) - (5 * age) + genderConstant;

        // Set activity multiplier based on plan
        let activityMultiplier;
        switch (user.activePlan) {
            case 'bulk':
                activityMultiplier = 1.7;
                break;
            case 'maintain':
                activityMultiplier = 1.5;
                break;
            case 'cut':
                activityMultiplier = 1.3;
                break;
            default:
                activityMultiplier = 1.5;
        }

        // Calculate total daily calorie intake
        return Math.round(bmr * activityMultiplier);
    };

    // Function to fetch meals data
    const fetchData = async () => {
        try {
            const [userResponse, mealsResponse] = await Promise.all([
                axios.get('http://localhost:5000/user', { withCredentials: true }),
                axios.get('http://localhost:5000/meals/today', { withCredentials: true })
            ]);

            setUser(userResponse.data.user);
            const calories = calculateCalorieIntake(userResponse.data.user);
            setCalorieIntake(calories);
            setDailyCalories(mealsResponse.data.totalCalories);
            setLastUpdate(new Date());
        } catch (error) {
            console.error('Error fetching data:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchData();

        // Set up an interval to check for day changes
        const interval = setInterval(() => {
            if (isNewDay()) {
                setDailyCalories(0); // Reset calories at midnight
                fetchData(); // Fetch new data for the new day
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [lastUpdate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, {
                withCredentials: true,
            });
            alert('Logout successful');
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out');
        }
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <Navbar />
            <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, marginTop: '64px' }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        textAlign: 'center',
                        color: '#e2e2e2',
                        fontWeight: 'bold'
                    }}
                >
                    {currentDate}
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Home Page
                </Typography>
                {user ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Welcome, {user.username}!
                        </Typography>

                        {calorieIntake && (
                            <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                                <Typography variant="h5" gutterBottom color='primary'>
                                    Your Daily Calorie Target
                                </Typography>
                                <DonutMacroChart
                                    current={dailyCalories}
                                    goal={calorieIntake}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Based on your {user.activePlan} plan
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                            sx={{ mt: 2 }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Typography>You are not logged in.</Typography>
                )}
            </Box>
        </div>
    );
}