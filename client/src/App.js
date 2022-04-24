//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Compiles pages with header, footer, and page routes

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from './pages/Account';
import Product from "./pages/Product";
import Favorites from './pages/Favorites';
import Department from './pages/Department';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={Landing()} />
          <Route exact path="/login" element={Login()} />
          <Route exact path="/register" element={Register()} />
          <Route exact path="/account" element={Account()} />
          <Route exact path="/product" element={Product()} />
          <Route exact path="/favorites" element={Favorites()} />
          <Route exact path="/cart" element={Cart()} />
          <Route exact path="/department" element={Department()} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
