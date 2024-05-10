import React, { useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get(`http://localhost:5000/users`).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <>
            <Button variant="outlined" onClick={fetchUsers} sx={{ marginBottom: '10px'}}>Fetch Users</Button>
            {(users && users.length) ? (
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
                                {users.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
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

export default UserDetails;