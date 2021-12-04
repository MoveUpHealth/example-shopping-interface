//  Author: Jessica Tax;
//  Date: November 22, 2021

//  Description: Handles api request needed for registration or login

import axios from "axios";

const api_url = "http://localhost:5000/api/auth/";

const register = (firstName, lastName, email, username, password) => {
    
    return axios.post(api_url + "signup", {
      firstName,
      lastName,
      email,
      username,
      password
    });
}

const login = (username, password) => {
    return axios
      .post(api_url + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  }

  const logout = () => {
    localStorage.removeItem("user");
  }

const userFunctions = {
    register,
    login,
    logout
};

export default userFunctions