import React, { Suspense, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import UserDetails from '../pages/users';
import LoginPage from '../pages/login';


const Routers = () => {
  const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} />} />
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<UserDetails loggedIn={loggedIn} />} />
            </Routes>
        </Suspense>
    )
}

export default Routers