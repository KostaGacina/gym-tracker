const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.json({ "fruits": ["apple", "banana", "cherry"] });
});

app.get('/msg', (req, res) => {
    res.json({ "message": "Welcome to GymTracker!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});