import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
export default function GymPage() {
    return (
        <div>
            <Navbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Gym Page
                </Typography>
                <Typography variant="body1">
                    This is the gym page where you can track your workouts and progress.
                </Typography>
            </Box>
        </div>
    );
}