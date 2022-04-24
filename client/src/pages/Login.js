//  Author: Jessica Tax;
//  Date: August 15, 2021

//  Description: Page for user login

import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import "./styles.css"

const required = val => {
    if(!val){
        return (
            <div>
                This field is required.
            </div>
        )
    }
    return true
}

function Login (props) {
    const [completed, setCompleted] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setCompleted(false)

        if( 
            errorUsername === true &&
            errorPassword === true){
            setCompleted(true)
        }
    }, [errorUsername, errorPassword]
    )

    const onChangeUsername = (e) => {
    const username = e.target.value;
    
    setUsername(username);
    setErrorUsername(required(username));
    };

    const onChangePassword = (e) => {
    const password = e.target.value;
    
    setPassword(password);
    setErrorPassword(required(password));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        authService.login(username, password).then(
            () => {
                //Redirect here
                navigate("/");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                
                setLoading(false);
                setMessage(resMessage);
            }
        )
    }

    return (
        <div className="login">
            <form className="login-form">
                <fieldset className="login-field">
                    <legend>
                        Login
                    </legend>
                    <label className="login-label" htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    {errorUsername}
                    
                    <label className="login-label" htmlFor="password">Password:</label>
                    <input 
                        type="password"
			id="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {errorPassword}
                    {message && (
                        <div className={loading ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                        >
                            {message}
                        </div>
                    )}

                    {!completed ? (
                        <button type="submit" className="submit-btn" id="submit-login" data-testid="submit-disabled" disabled>Submit</button>
                    ) : 
                    (
                        <button 
                            type="submit" 
                            className="submit-btn" 
                            id="submit-reg"
			    data-testid="submit-reg"
                            onClick={handleLogin}
                             >Login
                        </button>
                    )
                    }
                    <span className="register-link">Don't have an account? <Link to={"/register"}>Sign up</Link></span>
                </fieldset>
            </form>
        </div>
    )
}

export default Login;
