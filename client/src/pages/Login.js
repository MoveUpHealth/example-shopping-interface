//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Page for user login

import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function Login () {
    return (
        <div className="login">
            <form className="login-form">
                <fieldset className="login-field">
                    <legend>
                        Login
                    </legend>
                    <label className="login-label">E-mail/Username:</label>
                    <input type="email" />

                    <label className="login-label">Password:</label>
                    <input type="password"/>

                    <input type="submit" className="submit-btn" />
                    <span className="register-link">Don't have an account? <Link to={"/register"}>Sign up</Link></span>
                </fieldset>
            </form>
        </div>
    )
}

export default Login;