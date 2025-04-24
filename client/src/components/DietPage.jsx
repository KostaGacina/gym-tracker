import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';
export default function DietPage() {
    return (
        <div>
            <Navbar />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Diet Page
                </Typography>
                <Typography variant="body1">
                    This is the diet page where you can track your meals and macros.
                </Typography>
            </Box>
        </div>
    );
}
