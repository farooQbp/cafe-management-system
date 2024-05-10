import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import DashBoard from "./pages/container";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <DashBoard />
          </header>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
