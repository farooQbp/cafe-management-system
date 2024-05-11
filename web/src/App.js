import React, { useContext } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import DashBoard from "./pages/container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomSnackbar from "./components/snackbar";
import cafeManagement from "./store/cafe";
import { observer } from "mobx-react-lite";

function App() {
  const theme = createTheme();
  const cafeStore = useContext(cafeManagement);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <header className="App-header">
            <DashBoard />
          </header>
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
