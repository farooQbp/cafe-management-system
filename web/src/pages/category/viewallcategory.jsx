import React, { useContext, useEffect } from 'react';
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

const ViewAllCategory = ({ category }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);

    const fetchUsers = async () => {
        await cafeStore.fetchCategories();
    }

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.pageContainer}>
            <CustomButton variant="outlined" onClick={fetchUsers}>Update Category List</CustomButton>
            {(category && category.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                    <TableContainer sx={{ minWidth: 650, maxHeight: 200 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ID</b></TableCell>
                                    <TableCell><b>NAME</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ID}
                                        </TableCell>
                                        <TableCell>{row.NAME}</TableCell>
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

export default  observer(ViewAllCategory);
