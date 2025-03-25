import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

axios.defaults.withCredentials = true;

export default function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user', {
                    withCredentials: true,
                });
                setUser(response.data.user);
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
        <div>
            <h1>Home Page</h1>
            {user ? (
                <>
                    <p>Welcome, {user.username}!</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
}