import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Stack } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';
import TextInput from '../../components/textinput';
import CustomButton from '../../components/button';
import CustomDropdown from '../../components/dropdown';
import cafeManagement from '../../store/cafe';
import { observer } from 'mobx-react-lite';
import PAYLOAD_SAMPLE from '../../core/config/payload';

const AddNewUser = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        type: 'Customer',
    });
    const [formError, setFormError] = useState({
        name: false,
        email: false,
        password: false,
        type: false,
    });

    const cafeStore = useContext(cafeManagement);

    const fetchUserTypes = async () => {
        await cafeStore.fetchUserTypes();
    }

    useEffect(() => {
        if (!cafeStore.userType.length) fetchUserTypes();
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // email validation
        if (name === 'email' && value !== '') {
            setFormError({
                ...formError,
                [name]: !/^[A-Za-z0-9.]{1,30}@[A-Za-z]{2,20}\.[A-Za-z]{2,20}$/.test(value),
            });
        } else if (name === 'email' && value === '') {
            setFormError({
                ...formError,
                [name]: false,
            });
        }

        // name validation
        if (name === 'name' && value !== '') {
            setFormError({
                ...formError,
                [name]: !/^[A-Za-z\s]{1,20}$/.test(value),
            });
        } else if (name === 'name' && value === '') {
            setFormError({
                ...formError,
                [name]: false,
            });
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            type: '',
        });
    };

    const handleSubmit = async (e) => {
        if (Object.values(formData).includes('')) {
            cafeStore.handleSnackBar('warning', 'Fields should not be empty')
            return;
        } else if (Object.values(formError).includes(true)) {
            cafeStore.handleSnackBar('error', 'Invalid Entry')
            return;
        } else {
            let payload = {
                ...PAYLOAD_SAMPLE.ADD_USER,
                ...formData
            }
            payload = { ...payload, id: cafeStore.users.length + 1 }
            const response = await cafeStore.addNewUser(payload);
            if (response.status === 200) {
                cafeStore.handleSnackBar('success', response.data)
            }
            handleReset();
        }
    };

    return (
        <div className={classes.pageContainer}>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                <form className={classes.formContainer}>
                    <Stack direction="column" spacing={2} width='80%'>
                        <Stack direction="row" spacing={2}>
                            <TextInput
                                name="name"
                                id="username"
                                value={formData.name}
                                onChange={handleChange}
                                label="Name"
                                type='text'
                                error={formError.name}
                            />
                            <TextInput
                                name="email"
                                id="useremail"
                                value={formData.email}
                                onChange={handleChange}
                                label="Email"
                                type='email'
                                error={formError.email}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextInput
                                name="password"
                                id="userpassword"
                                isPassword
                                value={formData.password}
                                onChange={handleChange}
                                label="Password"
                                error={formError.password}
                            />
                            <CustomDropdown
                                name="type"
                                id="usertype"
                                value={formData.type}
                                onChange={handleChange}
                                label="User Type"
                                options={cafeStore.userType}
                                error={formError.type}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                            <CustomButton onClick={handleReset} className={classes.button} variant='outlined' startIcon={<BackspaceIcon />} >Clear Inputs</CustomButton>
                            <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Add New User</CustomButton>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default observer(AddNewUser);
