//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Header component for all pages

import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png"
import "./styles.css";

const Header = () => {
    const activeLink = useLocation()

    return (
        <div className="nav-bar">
        <nav className="user-nav">
            <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" className="search-bar" placeholder="Search..."/>
            </div>
            <div className="logo">
                <Link to={"/"}>
                    <img src={logo} alt="Shop Logo" height="80px" className="header-logo" />
                </Link>
            </div>
            <div className="account-nav">
                <div className="profile">
                    <Link to={"/login"} className={activeLink.pathname === "/login" ? "nav-link active" : "nav-link"}>
                        <p className="label">Sign In/Track Order</p>
                        <i className="far fa-user"></i>
                    </Link>
                </div>
                <div className="favorites">
                    <Link to={"/favorites"} className={activeLink.pathname === "/favorites" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-heart"></i>
                    </Link>
                </div>
                <div className="cart">
                    <Link to={"/cart"} className={activeLink.pathname === "/cart" ? "nav-link active" : "nav-link"}>
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
            </div>
        </nav>
        <nav className="products">
            <div className="department">
                <p className="nav-item">
                    Clothing
                </p>
            </div>
            <div className="department">
                <p className="nav-item">
                    Furniture
                </p>
            </div>
            <div className="department">
                <p className="nav-item">
                    Electronics
                </p>
            </div>
            <div className="department">
                <p className="nav-item">
                    Sale
                </p>
            </div>
            <div className="department">
                <p className="nav-item">
                    Clearance
                </p>
            </div>
        </nav>
        </div>
    )
}

export default Header