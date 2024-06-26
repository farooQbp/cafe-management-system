import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Stack } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';
import TextInput from '../../components/textinput';
import CustomButton from '../../components/button';
import cafeManagement from '../../store/cafe';
import { observer } from 'mobx-react-lite';
import PAYLOAD_SAMPLE from '../../core/config/payload';

const AddNewCategory = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
    });
    const [formError, setFormError] = useState({
        name: false,
    });

    const cafeStore = useContext(cafeManagement);

    const fetchCategoryTypes = async () => {
        await cafeStore.fetchCategories();
    }

    useEffect(() => {
        if (!cafeStore.categories.length) fetchCategoryTypes();
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

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
                ...PAYLOAD_SAMPLE.ADD_CATEGORY,
                ...formData
            }
            payload = { ...payload, id: cafeStore.categories.length + 1 }
            const response = await cafeStore.addNewCategory(payload);
            if (response) {
                if (response.status === 200) {
                    cafeStore.handleSnackBar('success', response.data)
                }
                handleReset();
            }
        }
    };

    return (
        <div className={classes.pageContainer}>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                <form className={classes.formContainer}>
                    <Stack direction="column" spacing={2} width='80%'>
                        <TextInput
                            name="name"
                            id="username"
                            value={formData.name}
                            onChange={handleChange}
                            label="Category Name"
                            type='text'
                            error={formError.name}
                        />
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                            <CustomButton onClick={handleReset} className={classes.button} variant='outlined' startIcon={<BackspaceIcon />} >Clear Inputs</CustomButton>
                            <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Add New Category</CustomButton>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default observer(AddNewCategory);
