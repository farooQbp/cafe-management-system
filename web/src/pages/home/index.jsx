import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStyles from './style';
import ProductItem from '../../components/productitem';
import cafeManagement from '../../store/cafe';
import CustomButton from '../../components/button';
import { Stack } from '@mui/material';
import CustomDropdown from '../../components/dropdown';

const Home = () => {
  const cafeStore = useContext(cafeManagement);
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [cartCheckout, setCartCheckout] = useState({});
  const [categoryMenu, setCategoryMenu] = useState([{ value: 0, label: 'All', selected: true }]);
  const [dietaryMenu, setDietaryMenu] = useState([{ value: 0, label: 'All', selected: true }]);
  const [sortMenu, setSortMenu] = useState([{ value: 0, label: 'Name', selected: true }, { value: 1, label: 'Price Low to High', selected: false }, { value: 3, label: 'Price High to Low', selected: false }]);

  const fetchAllItems = async () => {
    await cafeStore.fetchAllItems();
  }

  const fetchCategory = async () => {
    const response = await cafeStore.fetchCategories();
    if (response && response.data) {
      const category = response.data.map((item) => ({ value: item.ID, label: item.NAME, selected: false }));
      setCategoryMenu([{ value: 0, label: 'All', selected: true }, ...category]);
    }
  }

  const getSelectedValue = (arr = []) => {
    for (let item of arr) {
      if (item.selected) {
        return item.value;
      }
    }
    // Return null or handle the case when no item is selected
    return null;
  }

  const fetchDietary = async () => {
    const response = await cafeStore.fetchDietoryPreference();
    if (response && response.data) {
      const category = response.data.map((item) => ({ value: item.ID, label: item.NAME, selected: false }));
      setDietaryMenu([{ value: 0, label: 'All', selected: true }, ...category]);
    }
  }

  useEffect(() => {
    fetchDietary()
    fetchCategory()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchAllItems()
    // eslint-disable-next-line
  }, [dietaryMenu, categoryMenu])

  useEffect(() => {
    setProducts([...cafeStore.items])
  }, [cafeStore.items])

  const handleCart = (item) => {
    const selectedItems = { ...cartCheckout }
    selectedItems[item.itemId] = item;
    if (item.quantity === 0) delete selectedItems[item.itemId]
    setCartCheckout(selectedItems);
    cafeStore.updateCartItems(Object.values(selectedItems));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'sort') {
      const items = (name === 'category') ? [...categoryMenu] : [...dietaryMenu];
      for (let item of items) {
        item.selected = item.value === value
      }
      (name === 'category') ? setCategoryMenu(items) : setDietaryMenu(items);
    } else {
      const items = [...sortMenu];
      for (let item of items) {
        item.selected = item.value === value
      }
      setSortMenu(items);
    }
  }

  if (products.length === 0) {
    return (
      <div className={classes.root}>
        <CustomButton variant="outlined" onClick={fetchAllItems}>Update Items</CustomButton>
      </div>
    );
  }

  return (
    <Stack direction='column' spacing={2}>
      <Stack direction='row' spacing={2}>
        <CustomDropdown
          name="category"
          id="category"
          defaultValue={0}
          value={getSelectedValue(categoryMenu)}
          onChange={handleChange}
          label="Category"
          options={categoryMenu}
        />
        <CustomDropdown
          name="dietary"
          id="dietary"
          defaultValue={0}
          value={getSelectedValue(dietaryMenu)}
          onChange={handleChange}
          label="Dietary"
          options={dietaryMenu}
        />
        <CustomDropdown
          name="sort"
          id="sort"
          defaultValue={0}
          value={getSelectedValue(sortMenu)}
          onChange={handleChange}
          label="Sort"
          options={sortMenu}
        />
      </Stack>
      <div className={classes.root}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} handleCart={handleCart} />
        ))}
      </div>
    </Stack>
  );
};

export default observer(Home);
