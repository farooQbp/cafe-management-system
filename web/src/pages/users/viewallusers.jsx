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
    Paper,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import CustomButton from '../../components/button';

const ViewAllUsers = ({ users }) => {
    const classes = useStyles();
    const cafeStore = useContext(cafeManagement);

    const fetchUsers = async () => {
        await cafeStore.fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.pageContainer}>
            <CustomButton variant="outlined" onClick={fetchUsers}>Update Users List</CustomButton>
            {(users && users.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginY: '10px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">User Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow
                                        key={row.USER_ID}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.USER_NAME}
                                        </TableCell>
                                        <TableCell align="right">{row.USER_EMAIL}</TableCell>
                                        <TableCell align="right">{row.USER_TYPE}</TableCell>
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

export default  observer(ViewAllUsers);
