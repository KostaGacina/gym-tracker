import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function EnterStats() {
    const [formData, setFormData] = useState({
        sex: true, // true for male, false for female
        age: '',
        height: '',
        weight: '',
        bodyFatPercentage: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'sex' ? value === 'true' : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/enterstats', formData, {
                withCredentials: true
            });
            alert(response.data.message);
            navigate('/home');
        } catch (error) {
            console.error('Error saving stats:', error);
            alert('Failed to save stats');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <h1>Enter Your Stats</h1>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                    <FormLabel component="legend">Sex</FormLabel>
                    <RadioGroup
                        row
                        name="sex"
                        value={formData.sex.toString()}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Female"
                        />
                    </RadioGroup>
                </FormControl>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        type="number"
                        variant="outlined"
                        value={formData.age}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="height"
                        name="height"
                        label="Height (cm)"
                        type="number"
                        variant="outlined"
                        value={formData.height}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="weight"
                        name="weight"
                        label="Weight (kg)"
                        type="number"
                        variant="outlined"
                        value={formData.weight}
                        onChange={handleChange}
                        inputProps={{ min: 0 }}
                    />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="bodyFatPercentage"
                        name="bodyFatPercentage"
                        label="Body Fat Percentage"
                        type="number"
                        variant="outlined"
                        value={formData.bodyFatPercentage}
                        onChange={handleChange}
                        inputProps={{ min: 0, max: 100 }}
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Save Stats
                </Button>
            </form>
        </Box>
    );
}