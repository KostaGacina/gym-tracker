import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); // React Router hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData, {
                withCredentials: true // Explicitly include credentials
            });

            // Check if user has completed initial setup
            if (response.data.hasCompletedSetup) {
                navigate('/home');
            } else {
                navigate('/chooseplan');
            }

        } catch (error) {
            console.error('Error logging in user:', error);
            alert('Failed to log in. Please check your username and password.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => window.location.href = '/'}
            >
                Return to Home
            </Button>
        </Box>
    );
}