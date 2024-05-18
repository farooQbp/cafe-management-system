import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStyles from './style';
import ProductItem from '../../components/productitem';
import cafeManagement from '../../store/cafe';
import { Box, Stack } from '@mui/material';
import CustomDropdown from '../../components/dropdown';
import PAYLOAD_SAMPLE from '../../core/config/payload';

const Home = () => {
  const cafeStore = useContext(cafeManagement);
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [cartCheckout, setCartCheckout] = useState({});
  const [categoryMenu, setCategoryMenu] = useState([{ value: 0, label: 'All', selected: true }]);
  const [dietaryMenu, setDietaryMenu] = useState([{ value: 0, label: 'All', selected: true }]);
  const [itemPayload, setItemPayload] = useState(PAYLOAD_SAMPLE.ALL_ITEMS);
  const [sortMenu, setSortMenu] = useState([{ value: 0, label: 'Name', selected: true }, { value: 1, label: 'Price Low to High', selected: false }, { value: 2, label: 'Price High to Low', selected: false }]);

  const fetchAllItems = async (payload) => {
    await cafeStore.fetchAllItems(payload);
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
    fetchAllItems(itemPayload)
    // eslint-disable-next-line
  }, [])

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

  const handleFilter = (filters, fields, name) => {
    let updatedFilter = []
    if (!filters.length) {
      for (let item of fields) {
        if (item.selected && item.value !== 0) {
          updatedFilter.push({field: name, value: item.value})
          break;
        }
      }
    } else {
      const updatedPreviousFilter = filters.filter((item) => item.field !== name)
      for (let item of fields) {
        if (item.selected && item.value !== 0) {
          updatedPreviousFilter.push({field: name, value: item.value})
        }
      }
      updatedFilter = updatedPreviousFilter;
    }
    return updatedFilter;
  }

  const handleChange = (e) => {
    let payload = { ...itemPayload }
    const { name, value } = e.target;
    if (name !== 'sort') {
      let filters = [...payload.filter]
      const items = (name === 'CATEGORY') ? [...categoryMenu] : [...dietaryMenu];
      for (let item of items) {
        item.selected = item.value === value
      }
      (name === 'CATEGORY') ? setCategoryMenu(items) : setDietaryMenu(items);
      payload.filter = handleFilter(filters, items, name)
    } else {
      const items = [...sortMenu];
      for (let item of items) {
        item.selected = item.value === value
        if (item.value === value) {
          if (item.value === 0) {
            payload.sort.sort = 1
            payload.sort.value = 'NAME'
          } else {
            payload.sort.value = 'PRICE'
            payload.sort.sort = value === 1 ? 1 : -1
          }
        }
      }
      setSortMenu(items);
    }
    fetchAllItems(payload);
    setItemPayload(payload)
  }

  return (
    <Box sx={{ minHeight: '500px' }}>
      <Stack direction='column' spacing={2}>
        <Stack direction='row' spacing={2}>
          <CustomDropdown
            name="CATEGORY"
            id="category"
            defaultValue={0}
            value={getSelectedValue(categoryMenu)}
            onChange={handleChange}
            label="Category"
            options={categoryMenu}
          />
          <CustomDropdown
            name="DIETARY_PREFERENCE"
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
    </Box>
  );
};

export default observer(Home);
