import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/msg');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching the message:', error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>{message ? message : 'Loading...'}</h1>
        </div>
    );
};

export default Home;