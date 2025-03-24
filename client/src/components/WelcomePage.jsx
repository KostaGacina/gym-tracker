import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
const WelcomePage = () => {
    return (
        <div>
            <h1>Welcome to Gym Tracker</h1>

            <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = '/register'}
                >
                    Register
                </Button>
            </Box>

            <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = '/login'}
                >
                    Login
                </Button>
            </Box>
        </div>
    );
};

export default WelcomePage;