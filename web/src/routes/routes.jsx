import React, { Suspense, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import UserDetails from '../pages/users';
import LoginPage from '../pages/login';
import PrivateRoute from '../components/privateroutes';


const Routers = () => {
  const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path='/login' element={<LoginPage setLoggedIn={setLoggedIn} />} />
                <PrivateRoute path="/" component={Home} loggedIn={loggedIn} />
                <PrivateRoute path="/users" component={UserDetails} loggedIn={loggedIn} />
            </Routes>
        </Suspense>
    )
}

export default Routers