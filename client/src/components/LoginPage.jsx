import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function LoginPage() {
    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <h1>Login Page</h1>
            <form>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
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
    )
}