import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import Routers from '../../routes/routes';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DashBoard = observer(() => {

    const location = useLocation()
    return (
        <Observer>
            {() => (
                <Container
                    sx={(location && location.pathname && !location.pathname.includes('login')) ? {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    } : {overflow: 'hidden',}}
                ><Routers /></Container>)}
        </Observer>
    )
})

export default DashBoard