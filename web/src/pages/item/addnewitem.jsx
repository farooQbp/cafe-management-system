import React, { useContext, useEffect, useState } from 'react';
import useStyles from './styles';
import { Box, Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SendIcon from '@mui/icons-material/Send';
import TextInput from '../../components/textinput';
import CustomButton from '../../components/button';
import cafeManagement from '../../store/cafe';
import { observer } from 'mobx-react-lite';
import PAYLOAD_SAMPLE from '../../core/config/payload';
import CustomDropdown from '../../components/dropdown';
import InputFileUpload from './fileupload';
import CustomModal from '../../components/modal';

const AddNewItem = () => {
    const classes = useStyles();
    const [itemsVisible, setItemsVisible] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: 1,
        dietary: 1,
        ingredients: 0,
        imgUrl: ''
    });

    const cafeStore = useContext(cafeManagement);

    const fetchCategory = async () => {
        await cafeStore.fetchCategories();
    }

    const fetchDietary = async () => {
        await cafeStore.fetchDietoryPreference();
    }

    const fetchAllItemIngredients = async () => {
        const response = await cafeStore.fetchAllItemIngredient();
        if (response && response.data) {
            const allIngredients = [{ label: 'Add New Item Recipe', value: 0, ingredients: [] }];
            response.data.forEach((item) => {
                allIngredients.push({ label: item.itemName, value: item._id, ingredients: item.ingredients })
            })
            cafeStore.updateAllIngredients(allIngredients);
        }
    }

    useEffect(() => {
        fetchDietary();
        fetchCategory();
        fetchAllItemIngredients();
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'ingredientDrop') {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                ingredients: value,
            });
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            category: 1,
            dietary: 1,
            ingredients: 0,
            imgUrl: ''
        });
    };

    const handleSubmit = async (e) => {
        let payload = { ...PAYLOAD_SAMPLE.ADD_ITEM }
        payload = { ...payload, name: formData.name, category: formData.category, dietary: formData.dietary, imgUrl: formData.imgUrl }
        const response = await cafeStore.addNewItem(payload);
        if (response) {
            if (response.status === 200) {
                cafeStore.handleSnackBar('success', response.data)
            }
            handleReset();
        }
    };

    const handleChangeCheckBox = (e) => {
        const { name } = e.target;
        let itemIngredients = [...ingredients];
        itemIngredients.forEach((item) => {
            if (Number(name) === item.id) {
                item.selected = !item.selected
            }
        })
        setIngredients(itemIngredients);
    }

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        let itemIngredients = [...ingredients];
        itemIngredients.forEach((item) => {
            if (Number(name) === item.id) {
                item.quantity = Number(value)
            }
        })
        setIngredients(itemIngredients);
    }

    const handleSettingsModal = () => (
        <CustomModal open={itemsVisible}>
            <form className={classes.formContainer}>
                <Stack direction="column" spacing={2} minWidth={650}>
                    <TextInput
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        label="Name"
                        type='text'
                    />
                    <Stack direction="row" spacing={2}>
                        <TableContainer sx={{ minWidth: 450, maxHeight: 450 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>ID</b></TableCell>
                                        <TableCell><b>Ingredient</b></TableCell>
                                        <TableCell><b>Item Quantity in (grams or ml)</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ingredients.map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    name={row.id}
                                                    checked={row.selected}
                                                    onChange={handleChangeCheckBox}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                <TextInput
                                                    onChange={handleItemChange}
                                                    value={!row.selected ? 0 : row.quantity}
                                                    isDisabled={!row.selected}
                                                    name={row.id}
                                                    type='number'
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                        <CustomButton onClick={handleSettings} className={classes.button} variant='contained' endIcon={<SendIcon />} >Cancel</CustomButton>
                        <CustomButton onClick={handleIngredients} className={classes.button} variant='contained' endIcon={<SendIcon />} >Add Item Ingredients</CustomButton>
                    </Stack>
                </Stack>
            </form>
        </CustomModal>
    )

    const openSettings = async () => {
        const response = await cafeStore.fetchAvailableInventory();
        if (response && response.data) {
            let itemResponseValue = []
            response.data.forEach((item) => {
                itemResponseValue.push({ id: item.ID, name: item.NAME, quantity: 0, selected: false })
            })
            setIngredients(itemResponseValue)
            handleSettings()
        }
    }

    const handleSettings = () => {
        if (itemsVisible) setIngredients([]);
        setItemsVisible((item) => !item)
    }

    const handleIngredients = async () => {
        const itemIngredients = [...ingredients];
        const selectedItems = [];
        itemIngredients.forEach((item) => {
            if (item.selected && item.quantity !== 0) {
                selectedItems.push(
                    {
                        ingredient: item.name,
                        ingredientId: item.id,
                        quantity: item.quantity
                    }
                )
            }
        })
        if (selectedItems.length && formData.name !== '') {
            let payload = { ...PAYLOAD_SAMPLE.ADD_INGEDIENT }
            payload = { ...payload, ingredients: selectedItems, itemName: formData.name }
            const response = await cafeStore.addNewItemIngredient(payload);
            if (response && response.data) {
                setFormData({
                    ...formData,
                    ingredients: `${response.data} :: ${formData.name}`,
                });
                fetchAllItemIngredients();
                handleSettings()
                cafeStore.handleSnackBar('success', 'Ingredient Added Successfuly')
            }
        } else if (!selectedItems.length) {
            cafeStore.handleSnackBar('warning', 'Please add atleast one ingredient')
        } else if (formData.name === '') {
            cafeStore.handleSnackBar('warning', 'Please add item name to proceed')
        }
    }

    return (
        <div className={classes.pageContainer}>
            {itemsVisible && handleSettingsModal()}
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
                                isDisabled={formData.ingredients !== '' && formData.ingredients !== 0}
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
                                name='imgUrl'
                                onClick={handleChange}
                                value={formData.imgUrl}
                                noImage
                            />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <CustomDropdown
                                name="ingredientDrop"
                                id="ingredientDrop"
                                value={formData.ingredients}
                                onChange={handleChange}
                                label="Choose Ingredient"
                                options={cafeStore.allIngredients}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <CustomButton
                                fullWidth
                                variant='outlined'
                                name="handleIngredients"
                                id="handleIngredients"
                                onClick={openSettings}
                                disabled={formData.ingredients !== '' && formData.ingredients !== 0}
                            >Add New Recipe</ CustomButton>
                            <TextInput
                                name="ingredients"
                                id="ingredients"
                                isDisabled
                                shrink={formData.ingredients !== '' && formData.ingredients !== 0}
                                value={formData.ingredients !== 0 ? formData.ingredients : ''}
                                onChange={handleChange}
                                label="Ingredients ID :: Name"
                                options={cafeStore.dietory}
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
