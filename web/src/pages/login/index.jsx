import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { passwordEncrypt } from '../../core/utils';
import CustomButton from '../../components/button';

const LoginPage = (props) => {
    const {
        setLoggedIn,
    } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        const pppp = await passwordEncrypt(password)
        console.log('ppppppppppppppppppppppppppppppppp', password, pppp)
        // Simulate login logic (replace with actual logic)
        if (username === 'admin' && password === 'password') {
            setLoggedIn(true);
            navigate.push('/');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Café Login
                </Typography>
                <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <CustomButton
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </CustomButton>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
