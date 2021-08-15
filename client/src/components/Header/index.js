//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Header component for all pages

import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png"
import "./styles.css";

const Header = () => {
    

    return (
        <nav className="user-nav">
            <div className="search">
            <i class="fas fa-search"></i>
            <input type="text" className="search-bar" placeholder="Search..."/>
            </div>
            <div className="logo">
                <img src={logo} alt="Shop Logo" height="80px" className="header-logo" />
            </div>
            <div className="account-nav">
                <div className="profile">
                    <p className="label">Sign In/Track Order</p>
                    <i class="far fa-user"></i>
                </div>
                <div className="favorites">
                    <i class="far fa-heart"></i>
                </div>
                <div className="cart">
                <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
        </nav>
    )
}

export default Header