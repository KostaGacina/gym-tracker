import React, { useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import axios from 'axios';

const DonutMacroChart = ({ current, goal }) => {
    const [open, setOpen] = useState(false);
    const [mealData, setMealData] = useState({
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMealData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMeal = async () => {
        try {
            await axios.post('http://localhost:5000/meals/add', mealData, {
                withCredentials: true
            });
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error adding meal:', error);
            alert('Failed to add meal');
        }
    };

    const percentage = Math.min(Math.round((current / goal) * 100), 100);
    const remaining = goal - current;

    return (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Daily Calorie Progress
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={150}
                    thickness={5}
                    color={percentage >= 100 ? 'error' : 'primary'}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5" component="div">
                        {percentage}%
                    </Typography>
                </Box>
            </Box>

            <Stack spacing={1} alignItems="center">
                <Typography variant="body1">
                    <strong>{current}</strong> / {goal} kcal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {remaining > 0 ? `${remaining} kcal remaining` : 'Goal reached!'}
                </Typography>

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleOpen}
                >
                    Add Food
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Meal</DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2 }}>
                            <TextField
                                fullWidth
                                label="Calories"
                                name="calories"
                                type="number"
                                value={mealData.calories}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Protein (g)"
                                name="protein"
                                type="number"
                                value={mealData.protein}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Carbs (g)"
                                name="carbs"
                                type="number"
                                value={mealData.carbs}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Fats (g)"
                                name="fats"
                                type="number"
                                value={mealData.fats}
                                onChange={handleChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddMeal} variant="contained">
                            Add Meal
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Paper>
    );
};

export default DonutMacroChart;
