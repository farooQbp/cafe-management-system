import React, { useContext } from 'react';
import { 
    Box,
    Button,
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

const UserDetails = () => {
    const cafeStore = useContext(cafeManagement);

    const fetchUsers = async () => {
        await cafeStore.fetchUsers();
    }

    return (
        <>
            <Button variant="outlined" onClick={fetchUsers} sx={{ marginBottom: '10px'}}>Fetch Users</Button>
            {(cafeStore.users && cafeStore.users.length) ? (
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
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
                                {cafeStore.users.map((row) => (
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
        </>
    )
}

export default observer(UserDetails);