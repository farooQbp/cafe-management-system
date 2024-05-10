import React from "react";
import logo from './logo.svg';
import './App.css';
import UserDetails from "./pages/userDetails";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UserDetails />
      </header>
    </div>
  );
}

export default App;
