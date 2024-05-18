import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Typography,
    Switch,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import SendIcon from '@mui/icons-material/Send';
import cafeManagement from '../../store/cafe';
import CustomButton from '../../components/button';
import CustomModal from '../../components/modal';
import PAYLOAD_SAMPLE from '../../core/config/payload';
import TextInput from '../../components/textinput';
import InputFileUpload from './fileupload';

const ViewAllItem = ({ items }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);
    const [itemsVisible, setItemsVisible] = useState(false);
    const [ingredientsVisible, setIngredientsVisible] = useState(false);
    const [ingredients, setIngredients] = useState({
        itemName: '',
        ingredients: [],
    });
    const [formData, setFormData] = useState({
        ID: 0,
        NAME: '',
        availability: true,
        price: 0,
        upload: ''
    });
    const [formError, setFormError] = useState({
        NAME: false,
        price: false
    });

    const fetchUsers = async () => {
        await cafeStore.fetchAllItems();
    }

    const fetchCategory = async () => {
        await cafeStore.fetchCategories();
    }

    const fetchDietary = async () => {
        await cafeStore.fetchDietoryPreference();
    }

    useEffect(() => {
        if (!cafeStore.dietory.length) fetchDietary()
        if (!cafeStore.categories.length) fetchCategory()
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    const handleSettingsModal = () => (
        <CustomModal open={itemsVisible} onClose={openSettings}>
            <form className={classes.formContainer}>
                <Stack direction="column" spacing={2} width='80%'>
                    <Stack direction="row" spacing={2}>
                        <TextInput
                            name="NAME"
                            id="name"
                            value={formData.NAME}
                            onChange={handleChange}
                            label="Name"
                            type='text'
                            error={formError.NAME}
                        />
                        <InputFileUpload
                            name='upload'
                            onClick={handleChange}
                            value={formData.upload}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextInput
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            label="Price"
                            error={formError.price}
                        />
                        <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                            <Typography textAlign='center'>Not Available</Typography>
                            <Switch
                                name="availability"
                                id="availability"
                                checked={formData.availability}
                                color="secondary"
                                onClick={handleChange}
                            />
                            <Typography textAlign='center'>Available</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                        <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Update Item</CustomButton>
                    </Stack>
                </Stack>
            </form>
        </CustomModal>
    )

    const openSettings = () => {
        setItemsVisible((item) => !item)
    }

    const openIngredients = () => {
        setIngredientsVisible(false)
    }

    const updateStock = (item) => {
        setFormData({
            ID: item._id,
            NAME: item.NAME,
            availability: item.AVAILABILITY,
            price: item.PRICE,
            upload: item.IMG_URL,
        })
        openSettings()
    }

    const handleIngredientsModal = () => (
        <CustomModal open={ingredientsVisible} onClose={openIngredients}>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <Typography textAlign='center'>Ingredient List for {ingredients.itemName}</Typography>
            </Stack>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Ingredient</b></TableCell>
                        <TableCell><b>Item Quantity in (grams or ml)</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.ingredients.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.ingredient}
                            </TableCell>
                            <TableCell>{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CustomModal>
    )

    const loadIngredient = async (item) => {
        const response = await cafeStore.fetchItemIngredient(item);
        if (response) {
            if (response.data && (response.status === 200)) {
                const selectedItem = response.data[0];
                setIngredients(selectedItem);
                setIngredientsVisible(true);
            } else cafeStore.handleSnackBar('error', 'Error Occurred')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'availability') {
            setFormData({
                ...formData,
                [name]: !formData.availability,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });

            // name validation
            if (name === 'NAME' && value !== '') {
                setFormError({
                    ...formError,
                    [name]: !/^[A-Za-z\s]{1,20}$/.test(value),
                });
            } else if (name === 'NAME' && value === '') {
                setFormError({
                    ...formError,
                    [name]: false,
                });
            }
            if (name !== 'NAME' && value !== '') {
                setFormError({
                    ...formError,
                    [name]: !/^[0-9]{1,10}$/.test(value),
                });
            } else if (name !== 'NAME' && value === '') {
                setFormError({
                    ...formError,
                    [name]: false,
                });
            }
        }
    };

    const handleReset = () => {
        setFormData({
            NAME: '',
            availability: 0,
            price: 0,
            upload: '',
            ID: 0,
        });
    };

    const handleSubmit = async () => {
        if (Object.values(formData).includes('')) {
            cafeStore.handleSnackBar('warning', 'Fields should not be empty')
            return;
        } else if (Object.values(formError).includes(true)) {
            cafeStore.handleSnackBar('error', 'Invalid Entry')
            return;
        } else {
            let payload = {
                ...PAYLOAD_SAMPLE.UPDATE_ITEM,
            }
            payload = { name: formData.NAME, availability: formData.availability, price: Number(formData.price), image: formData.upload }
            const response = await cafeStore.updateItem(formData.ID, payload);
            if (response) {
                if (response.status === 200) {
                    cafeStore.handleSnackBar('success', response.data)
                }
                handleReset();
            }
        }
    };

    const filterIDwithName = (id, data) => {
        const filteredData = data.filter((item) => item.ID === id)
        return (filteredData && filteredData[0] && filteredData[0].NAME) || null
    }

    return (
        <div className={classes.pageContainer}>
            <CustomButton variant="outlined" onClick={fetchUsers}>Update Items</CustomButton>
            {(items && items.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                    {itemsVisible && handleSettingsModal()}
                    {ingredientsVisible && handleIngredientsModal()}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ITEM</b></TableCell>
                                    <TableCell><b>NAME</b></TableCell>
                                    <TableCell><b>INGREDIENTS</b></TableCell>
                                    <TableCell><b>VEG / NON VEG</b></TableCell>
                                    <TableCell><b>CATEGORY</b></TableCell>
                                    <TableCell><b>PRICE</b></TableCell>
                                    <TableCell><b>AVAILABLITY</b></TableCell>
                                    <TableCell><b>UPDATE</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell><img src={row.IMG_URL} width={60} alt='item' /></TableCell>
                                        <TableCell>{row.NAME}</TableCell>
                                        <TableCell><CustomButton variant="outlined" onClick={() => loadIngredient(row.INGREDIENTS)}>INGREDIENTS</CustomButton></TableCell>
                                        <TableCell>{filterIDwithName(row.DIETARY_PREFERENCE, cafeStore.dietory)}</TableCell>
                                        <TableCell>{filterIDwithName(row.CATEGORY, cafeStore.categories)}</TableCell>
                                        <TableCell>{row.PRICE}</TableCell>
                                        <TableCell>{row.AVAILABILITY ? 'Yes' : 'No'}</TableCell>
                                        <TableCell><CustomButton variant="outlined" onClick={() => updateStock(row)}>Edit Item</CustomButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : null}
        </div>
    );
};

export default observer(ViewAllItem);
