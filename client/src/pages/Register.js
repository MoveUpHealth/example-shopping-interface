//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Page for user registration

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import "./styles.css"

const validate = (val, type) => {
    if(!val){
        return (
            <div>
                This field is required.
            </div>
        )
    }
    switch (type){
        case "firstName":
            return validName(val);
        case "lastName":
            return validName(val);
        case "email":
            return validEmail(val);
        case "username":
            return validUsername(val);
        default:
            return true;
    }
}

const validName = (val) => {
    if(val.length >= 2 && val.length <= 40){
        return(true)
    }
        return (
            <div>
                Your entry must be between 2 and 40 characters.
            </div>
        )
}

const validEmail = (val) => {
    if(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(val)){
        return(true)
    } 
        return (
            <div>
                Please enter a valid email.
            </div>
        )
}

const validUsername = (val) => {
    if(val.length >= 5 && val.length <= 35){
        return (true)
    }
        return (
            <div>
                The username must be between 5 and 35 characters.
            </div>
        )
}

function Register (props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorFirst, setErrorFirst] = useState("");
    const [errorLast, setErrorLast] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    useEffect(() => {
        setCompleted(false)

        if( errorFirst === true &&
            errorLast === true && 
            errorEmail === true &&
            errorUsername === true &&
            errorPassword === true){
            setCompleted(true)
        }
    }, [errorFirst, errorLast, errorEmail, errorUsername, errorPassword]
    )
    
    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        
        setFirstName(firstName);
        setErrorFirst(validate(firstName, "firstName"))
    };
    
    const onChangeLastName = (e) => {
    const lastName = e.target.value;
    
    setLastName(lastName);
    setErrorLast(validate(lastName, "lastName"));
    };

    const onChangeEmail = (e) => {
    const email = e.target.value;
    
    setEmail(email);        
    setErrorEmail(validate(email, "email"));
    };

    const onChangeUsername = (e) => {
    const username = e.target.value;
    
    setUsername(username);
    setErrorUsername(validate(username, "username"));
    };

    const onChangePassword = (e) => {
    const password = e.target.value;
    
    setPassword(password);
    setErrorPassword(validate(password, "password"));
    };

    const handleRegistration = (e) => {
        e.preventDefault()

        setMessage("");
        setSuccessful(false);

        authService.register(firstName, lastName, email, username, password)
            .then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);

                //Add login and redirect here
                props.history.push("/");
                window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            )
    }

    return (
        <div>
            <div className="login">
            <form className="login-form">
                <fieldset className="login-field">
                    <legend>
                        Login
                    </legend>
                    <label className="login-label">First Name:</label>
                    <input 
                        type="name"
                        name="firstName"
                        value={firstName}
                        onChange={onChangeFirstName}
                    />
                    {errorFirst}

                    <label className="login-label">Last Name:</label>
                    <input 
                        type="name"
                        name="lastName"
                        value={lastName}
                        onChange={onChangeLastName}
                    />
                    {errorLast}

                    <label className="login-label">E-mail:</label>
                    <input 
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                     />
                     {errorEmail}

                    <label className="login-label">Username:</label>
                    <input 
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    {errorUsername}
                    
                    <label className="login-label">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {errorPassword}
                    {message && (
                        <div className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                        >
                            {message}
                        </div>
                    )}
                    {!completed ? (
                        <button type="submit" className="submit-btn" id="submit-reg" disabled>Submit</button>
                    ) : 
                    (
                        <button 
                            type="submit" 
                            className="submit-btn" 
                            id="submit-reg"
                            onClick={handleRegistration}
                             >Submit
                        </button>
                    )
                    }
                    <span className="register-link">Already have an account? <Link to={"/login"}>Log In</Link></span>
                </fieldset>
            </form>
        </div>
        </div>
    )
}

export default Register;
