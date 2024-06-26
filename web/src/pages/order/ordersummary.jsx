import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cafeManagement from '../../store/cafe';
import PAYLOAD_SAMPLE from '../../core/config/payload';
import { Card, CardMedia, CircularProgress, Container, Grid, Typography } from '@mui/material';

const OrderSummary = ({ fetchOrderSummary, ingredientDetails, loading }) => {
    const cafeStore = useContext(cafeManagement);

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
                            image={`${window.appSettings.API_BASE_URL}/${ingredientDetails.date_vs_price}`}
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
                            image={`${window.appSettings.API_BASE_URL}/${ingredientDetails.items_vs_quantity}`}
                            title="Items vs Quantity"
                        />
                        <Typography variant="h6" gutterBottom>
                            Items vs Quantity
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Items vs Quantity"
                            image={`${window.appSettings.API_BASE_URL}/${ingredientDetails.ingredient_consumption}`}
                            title="Items vs Quantity"
                        />
                        <Typography variant="h6" gutterBottom>
                            Ingredient Consumption
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Items vs Quantity"
                            image={`${window.appSettings.API_BASE_URL}/${ingredientDetails.sale_profit}`}
                            title="Date vs Profit"
                        />
                        <Typography variant="h6" gutterBottom>
                            Profit Status
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default observer(OrderSummary);
