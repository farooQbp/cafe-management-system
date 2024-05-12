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

function App() {
  const [open, setOpen] = useState(false);
  const theme = createTheme();
  // {
  //   palette: {
  //     background: {
  //       paper: '#fff',
  //     },
  //     text: {
  //       primary: '#173A5E',
  //       secondary: '#46505A',
  //     },
  //     action: {
  //       active: '#001E3C',
  //     },
  //     success: {
  //       dark: '#009688',
  //     },
  //   },
  // }
  const cafeStore = useContext(cafeManagement);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="formContainer" />
        <div className="overlay" />
        <div>
          <CustomAppBar toggleDrawer={toggleDrawer} />
          <CustomDrawer toggleDrawer={toggleDrawer} open={open} />
          <DashBoard />
          <CustomSnackbar
            open={cafeStore.showSnackbar.open}
            message={cafeStore.showSnackbar.message}
            type={cafeStore.showSnackbar.type}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default observer(App);
