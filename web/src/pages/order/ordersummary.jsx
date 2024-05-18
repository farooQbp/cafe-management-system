import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import PAYLOAD_SAMPLE from '../../core/config/payload';
import { Card, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';

const OrderSummary = () => {
    const cafeStore = useContext(cafeManagement);
    const [imageUrls, setImageUrls] = useState({
        date_vs_price: '',
        items_vs_quantity: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchOrderSummary = async () => {
        const response = await cafeStore.fetchOrderSummary(PAYLOAD_SAMPLE.ADD_USER);
        if (response && response.data) {
            setImageUrls(response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrderSummary();
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Date vs Price"
                            image={`${window.appSettings.API_BASE_URL}/${imageUrls.date_vs_price}`}
                            title="Date vs Price"
                        />
                        <Typography variant="h6" gutterBottom>
                            Date vs Price
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Items vs Quantity"
                            image={`${window.appSettings.API_BASE_URL}/${imageUrls.items_vs_quantity}`}
                            title="Items vs Quantity"
                        />
                        {console.log(window.appSettings.API_BASE_URL+imageUrls.items_vs_quantity)}
                        <Typography variant="h6" gutterBottom>
                            Items vs Quantity
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default observer(OrderSummary);
