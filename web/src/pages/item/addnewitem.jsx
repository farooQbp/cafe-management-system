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
import CustomDropdown from '../../components/dropdown';
import InputFileUpload from './fileupload';

const AddNewItem = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        availability: 0,
        price: 0
    });

    const cafeStore = useContext(cafeManagement);

    const fetchCategory = async () => {
        await cafeStore.fetchCategories();
    }

    const fetchDietary = async () => {
        await cafeStore.fetchDietoryPreference();
    }

    useEffect(() => {
        fetchDietary()
        fetchCategory()
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleReset = () => {
        setFormData({
            name: '',
            availability: 0,
            price: 0
        });
    };

    const handleSubmit = async (e) => {
        let payload = {
            ...PAYLOAD_SAMPLE.ADD_INVENTORY,
            ...formData
        }
        payload = { ...payload, id: cafeStore.inventory.length + 1 }
        const response = await cafeStore.addNewInventory(payload);
        if (response) {
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
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                label="Name"
                                type='text'
                            />
                            <CustomDropdown
                                name="dietary"
                                id="dietary"
                                value={formData.dietary}
                                onChange={handleChange}
                                label="Veg or Non Veg"
                                options={cafeStore.dietory}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <CustomDropdown
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Category"
                                options={cafeStore.categories}
                            />
                            <InputFileUpload
                                name='upload'
                                onClick={handleChange}
                                value={formData.upload}
                                noImage
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                            <CustomButton onClick={handleReset} className={classes.button} variant='outlined' startIcon={<BackspaceIcon />} >Clear Inputs</CustomButton>
                            <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Add New Item</CustomButton>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};

export default observer(AddNewItem);
