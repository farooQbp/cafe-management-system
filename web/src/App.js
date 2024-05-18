import React, { useContext, useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import DashBoard from "./pages/container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomSnackbar from "./components/snackbar";
import cafeManagement from "./store/cafe";
import { observer } from "mobx-react-lite";
import CustomAppBar from "./components/appbar";
import './index.css';
import CustomDrawer from "./components/drawer";
import LoginPage from "./pages/login";

function App() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const theme = createTheme();
  const cafeStore = useContext(cafeManagement);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      {!loggedIn ? <LoginPage setLoggedIn={setLoggedIn} /> : null}
      {loggedIn ? (
        <Router>
          <>
            <div className="formContainer" />
            <div className="overlay" />
          </>
          <div>
            <CustomAppBar toggleDrawer={toggleDrawer} setLoggedIn={setLoggedIn} />
            <CustomDrawer toggleDrawer={toggleDrawer} open={open} />
            <DashBoard loggedIn={loggedIn} />
          </div>
        </Router>
      )
        : null}
      <CustomSnackbar
        open={cafeStore.showSnackbar.open}
        message={cafeStore.showSnackbar.message}
        type={cafeStore.showSnackbar.type}
      />
    </ThemeProvider>
  );
}

export default observer(App);
