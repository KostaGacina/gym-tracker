import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function ChoosePlan() {
    const navigate = useNavigate();

    const handleChoosePlan = async (plan) => {
        try {
            const response = await axios.post('http://localhost:5000/chooseplan',
                { activePlan: plan },
                { withCredentials: true }
            );
            if (response.status === 200) {
                navigate('/enterstats');
            }
        } catch (error) {
            console.error('Error setting plan:', error);
            alert('Failed to set plan. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="buff bodybuilder"
                    height="270"
                    image="https://images.unsplash.com/photo-1704223524532-c5b4e8490297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM4fHxib2R5YnVpbGRlcnxlbnwwfHwwfHx8MA%3D%3D"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Bulk
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Bulking is a phase of intentional calorie surplus and progressive overload to maximize muscle growth.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant='contained'
                        onClick={() => handleChoosePlan('bulk')}
                    >
                        Choose Plan
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="regular sized bodybuilder"
                    height="270"
                    image="https://plus.unsplash.com/premium_photo-1661576743827-7f4dc8713fd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxib2R5YnVpbGRlcnxlbnwwfHwwfHx8MA%3D%3D"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Maintain
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Maintaining is a phase of balanced calorie intake and consistent training to preserve current muscle mass and body composition.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant='contained'
                        onClick={() => handleChoosePlan('maintain')}
                    >
                        Choose Plan
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="lean bodybuilder"
                    height="270"
                    image="https://images.unsplash.com/photo-1643028588901-87770ed4469c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGJvZHlidWlsZGVyfGVufDB8fDB8fHww"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Cut
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Cutting is a phase of intentional calorie deficit and strategic training to minimize muscle loss while reducing body fat.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant='contained'
                        onClick={() => handleChoosePlan('cut')}
                    >
                        Choose Plan
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}