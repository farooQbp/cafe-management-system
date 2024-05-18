import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import Routers from '../../routes/routes';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DashBoard = observer(({ loggedIn }) => {

    const location = useLocation()
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
                        maxHeight: (location && location.pathname && location.pathname !== '/') ? '80vh' : '100vh',
                        overflowY: 'auto',
                    }}
                ><Routers loggedIn={loggedIn} /></Container>)}
        </Observer>
    )
})

export default DashBoard