import React, { useContext, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { passwordEncrypt } from '../../core/utils';
import CustomButton from '../../components/button';
import useStyles from './styles';
import TextInput from '../../components/textinput';
import cafeManagement from '../../store/cafe';

const LoginPage = (props) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);
    const {
        setLoggedIn,
    } = props;

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        const encryptedPassword = await passwordEncrypt(userLogin.password)
        const userLoginStatus = await cafeStore.userLoginAction(`${userLogin.email}/${encryptedPassword}`)
        if (userLoginStatus) {
            if (userLoginStatus.data && userLoginStatus.data.length) {
                setLoggedIn(true);
                cafeStore.updateUserName(userLoginStatus.data)
                cafeStore.handleSnackBar('success', "User Logged in Successfully")
            } else {
                setLoggedIn(false);
                cafeStore.updateUserName([])
                cafeStore.handleSnackBar('error', "Invalid email or password")
            }
        }
    };

    return (
        <div className={classes.formContainer}>
            <div className={classes.overlay} />
            <div className={classes.loginDiv}>
                <Typography variant="h4" align="center" gutterBottom color='red'>
                    Café Login
                </Typography>
                <Stack direction="column" spacing={2} width='90%'>
                    <TextInput
                        name="email"
                        id="useremail"
                        onChange={handleChange}
                        label="Email"
                        type='text'
                        value={userLogin.email}
                    />
                    <TextInput
                        name="password"
                        id="userpassword"
                        isPassword
                        onChange={handleChange}
                        label="Password"
                        value={userLogin.password}
                    />
                    <CustomButton
                        onClick={handleLogin}
                        variant="outlined"
                        color="primary"
                    >
                        Login
                    </CustomButton>
                </Stack>
            </div>
        </div>
    );
};

export default LoginPage;
