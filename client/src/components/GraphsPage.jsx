import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
export default function GraphsPage() {
    return (
        <div>
            <Navbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Graphs Page
                </Typography>
                <Typography variant="body1">
                    This is the graphs page where you can visualize your progress.
                </Typography>
            </Box>
        </div>
    );
}