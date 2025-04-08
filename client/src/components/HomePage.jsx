import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

axios.defaults.withCredentials = true;

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [calorieIntake, setCalorieIntake] = useState(null);

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user', {
                    withCredentials: true,
                });
                setUser(response.data.user);
                const calories = calculateCalorieIntake(response.data.user);
                setCalorieIntake(calories);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

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

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
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
                            <Typography variant="h3" color="primary">
                                {calorieIntake} kcal
                            </Typography>
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
    );
}