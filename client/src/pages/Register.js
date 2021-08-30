//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Page for user registration

import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function Register () {
    return (
        <div>
            <div className="login">
            <form className="login-form">
                <fieldset className="login-field">
                    <legend>
                        Login
                    </legend>
                    <label className="login-label">First Name:</label>
                    <input type="name" />

                    <label className="login-label">Last Name:</label>
                    <input type="name" />

                    <label className="login-label">E-mail:</label>
                    <input type="email" />

                    <label className="login-label">Username:</label>
                    <input type="text" />
                    
                    <label className="login-label">Password:</label>
                    <input type="password"/>

                    <input type="submit" className="submit-btn" />
                    <span className="register-link">Already have an account? <Link to={"/login"}>Log In</Link></span>
                </fieldset>
            </form>
        </div>
        </div>
    )
}

export default Register;