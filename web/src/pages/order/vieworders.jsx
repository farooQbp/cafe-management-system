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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import CustomButton from '../../components/button';
import CustomModal from '../../components/modal';

const ViewAllOrders = ({ orders }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);
    const [itemsVisible, setItemsVisible] = useState(false);
    const [items, setItems] = useState([])

    const fetchOrders = async () => {
        await cafeStore.fetchCurrentOrder();
    }

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, [])

    const handleSettingsModal = () => (
        <CustomModal open={itemsVisible} onClose={openSettings}>
            <TableContainer sx={{ minWidth: 650, maxHeight: 200 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Item Name</b></TableCell>
                            <TableCell><b>Item Quantity</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.item}
                                </TableCell>
                                <TableCell>{row.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomModal>
    )

    const openSettings = () => {
        setItemsVisible((item) => !item)
    }

    const viewOrderedItems = (items) => {
        setItems(items)
        openSettings()
    }

    return (
        <div className={classes.pageContainer}>
            <CustomButton variant="outlined" onClick={fetchOrders}>Update Order Table</CustomButton>
            {(orders && orders.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                    {itemsVisible && handleSettingsModal()}
                    <TableContainer sx={{ minWidth: 650, maxHeight: 200 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Machine Name</b></TableCell>
                                    <TableCell><b>Date and Time</b></TableCell>
                                    <TableCell><b>Ordered Items</b></TableCell>
                                    <TableCell><b>Total Cost</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.customer}
                                        </TableCell>
                                        <TableCell>{new Date(row.orderDateandTime).toLocaleString()}</TableCell>
                                        <TableCell><CustomButton variant="outlined" onClick={() => viewOrderedItems(row.orderDetails)}>View Items</CustomButton></TableCell>
                                        <TableCell>{row.price}</TableCell>
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

export default observer(ViewAllOrders);
