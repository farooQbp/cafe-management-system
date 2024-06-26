import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import UserDetails from '../pages/users';
import OrderManagement from '../pages/order';
import CategoryDetails from '../pages/category';
import InventoryDetails from '../pages/inventory';
import ItemDetails from '../pages/item';


const Routers = ({ loggedIn }) => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<UserDetails loggedIn={loggedIn} />} />
                <Route path='/orders' element={<OrderManagement loggedIn={loggedIn} />} />
                <Route path='/inventory' element={<InventoryDetails loggedIn={loggedIn} />} />
                <Route path='/items' element={<ItemDetails loggedIn={loggedIn} />} />
                <Route path='/category' element={<CategoryDetails loggedIn={loggedIn} />} />
            </Routes>
        </Suspense>
    )
}

export default Routers