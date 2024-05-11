import React from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';

function SlideTransition(props) {
    return <Slide  {...props} timeout={600} />;
}

export default function CustomSnackbar({ open, message, type }) {

    return (
        <Snackbar
            open={open}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}                
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
