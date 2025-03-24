import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
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
            const response = await axios.post('http://localhost:5000/register', formData);
            alert(response.data.message); // Show success message
            navigate('/home'); // Redirect to /home after successful registration
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register user');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
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
                    Register
                </Button>
            </form>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => window.location.href = '/'}
            >
                Return to Welcome
            </Button>
        </Box>
    );
}