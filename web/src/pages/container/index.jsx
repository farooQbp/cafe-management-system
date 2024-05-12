import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import Routers from '../../routes/routes';
import { Container } from '@mui/material';

const DashBoard = observer(() => {
    return (
        <Observer>
            {() => (
                <Container
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    }}
                ><Routers /></Container>)}
        </Observer>
    )
})

export default DashBoard