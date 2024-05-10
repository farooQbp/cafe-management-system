import React from 'react';
import { Container } from '@mui/material';
import { Observer, observer } from 'mobx-react-lite';
import Routers from '../../routes/routes';

const DashBoard = observer(() => {
    return (
        <Observer>
            {() => (
                <>
                    <Container maxWidth="xl" >
                        <Routers />
                    </Container>
                </>
            )}
        </Observer>
    )
})

export default DashBoard