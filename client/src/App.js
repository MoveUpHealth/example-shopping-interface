//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Compiles pages with header, footer, and page routes

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/department" component={Department} />
      </div>
    </Router>
  );
}

export default App;
