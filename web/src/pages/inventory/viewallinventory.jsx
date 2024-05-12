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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import SendIcon from '@mui/icons-material/Send';
import cafeManagement from '../../store/cafe';
import CustomButton from '../../components/button';
import CustomModal from '../../components/modal';
import PAYLOAD_SAMPLE from '../../core/config/payload';
import TextInput from '../../components/textinput';

const ViewAllInventory = ({ inventory }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);
    const [itemsVisible, setItemsVisible] = useState(false);
    const [formData, setFormData] = useState({
        ID: 0,
        NAME: '',
        STOCK_AVAILABLE: 0,
        PRICE_PER_UNIT: 0
    });
    const [formError, setFormError] = useState({
        NAME: false,
        STOCK_AVAILABLE: false,
        PRICE_PER_UNIT: false
    });

    const fetchUsers = async () => {
        await cafeStore.fetchAvailableInventory();
    }

    useEffect(() => {
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
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextInput
                            name="PRICE_PER_UNIT"
                            id="PRICE_PER_UNIT"
                            value={formData.PRICE_PER_UNIT}
                            onChange={handleChange}
                            label="Price per (KG or Litre)"
                            error={formError.PRICE_PER_UNIT}
                        />
                        <TextInput
                            name="STOCK_AVAILABLE"
                            id="STOCK_AVAILABLE"
                            value={formData.STOCK_AVAILABLE}
                            onChange={handleChange}
                            label="Stock"
                            error={formError.STOCK_AVAILABLE}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
                        <CustomButton onClick={handleSubmit} className={classes.button} variant='contained' endIcon={<SendIcon />} >Update Inventory</CustomButton>
                    </Stack>
                </Stack>
            </form>
        </CustomModal>
    )

    const openSettings = () => {
        setItemsVisible((item) => !item)
    }

    const updateStock = (item) => {
        setFormData(item)
        openSettings()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    };

    const handleReset = () => {
        setFormData({
            NAME: '',
            STOCK_AVAILABLE: 0,
            PRICE_PER_UNIT: 0
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
                ...PAYLOAD_SAMPLE.UPDATE_INVENTORY,
            }
            payload = { availability: formData.STOCK_AVAILABLE, price: formData.PRICE_PER_UNIT }
            const response = await cafeStore.updateInventoryStatus(formData.ID, payload);
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
            <CustomButton variant="outlined" onClick={fetchUsers}>Update Inventory List</CustomButton>
            {(inventory && inventory.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                    {itemsVisible && handleSettingsModal()}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell><b>NAME</b></TableCell>
                                    <TableCell><b>PRICE</b></TableCell>
                                    <TableCell><b>STOCK QUANTITY</b></TableCell>
                                    <TableCell><b>UPDATE</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventory.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ID}
                                        </TableCell>
                                        <TableCell>{row.NAME}</TableCell>
                                        <TableCell>{row.PRICE_PER_UNIT}</TableCell>
                                        <TableCell>{row.STOCK_AVAILABLE}</TableCell>
                                        <TableCell><CustomButton variant="outlined" onClick={() => updateStock(row)}>Update Item</CustomButton></TableCell>
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

export default observer(ViewAllInventory);
