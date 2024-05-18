// ProductItem.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useStyles from './style';
import CustomButton from '../button';

const ProductItem = ({ product, handleCart }) => {
  const classes = useStyles();
  const [itemQuantity, setQuantity] = useState({
    item: 'Name',
    itemId: 1,
    ingredientId: '',
    quantity: 0,
  });

  useEffect(() => {
    if (product && Object.keys(product || {}).length) {
      setQuantity({
        item: product.NAME,
        itemId: product._id,
        ingredientId: product.INGREDIENTS,
        quantity: 0,
      })
    }
  }, [product])

  const handleAdd = () => {
    if (itemQuantity.quantity <= 10) {
      const item = { ...itemQuantity, quantity: itemQuantity.quantity + 1 }
      setQuantity(item);
      handleCart(item);
    }
  };

  const handleSubtract = () => {
    if (itemQuantity.quantity > 0) {
      const item = { ...itemQuantity, quantity: itemQuantity.quantity - 1 }
      setQuantity(item);
      handleCart(item);
    }
  };

  return (
    <Card className={classes.root}>
      <div className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          image={product.IMG_URL}
          title={product.NAME}
        />
      </div>
      <CardContent className={classes.content}>
        <Stack direction="row" spacing={2} justifyContent='center'>
          <Typography variant="h6" component="h2">
            {product.NAME}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent='center'>
          <Stack direction="column" >
            <Typography variant="body2" color="textSecondary" component="p">
              Category: {product.CATEGORY}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.DIETARY_PREFERENCE === 1 ? 'Veg' : 'Non-Veg'}
            </Typography>
          </Stack>
          <Typography variant="body1" component="p">₹{product.PRICE}</Typography>
        </Stack>
        {itemQuantity.quantity === 0 ? (
          <CustomButton disableTouchRipple disableRipple disableFocusRipple  onClick={handleAdd}>
            <AddIcon />
          </CustomButton>
        ) : (
          <div className={classes.actions}>
            <CustomButton disableTouchRipple disableRipple disableFocusRipple  onClick={handleSubtract}>
              <RemoveIcon />
            </CustomButton>
            <Typography variant="body1" component="p">
              {itemQuantity.quantity}
            </Typography>
            <CustomButton disabled={itemQuantity.quantity === 10} disableTouchRipple disableRipple disableFocusRipple onClick={handleAdd}>
              <AddIcon />
            </CustomButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
