//  Author: Jessica Tax;
//  Date: November 22, 2021

//  Description: Handles api request needed for registration or login

import axios from "axios";

const register = (firstName, lastName, email, username, password) => {
    return axios.post("/api/auth/signup", {
      firstName,
      lastName,
      email,
      username,
      password
    });
}

const login = (username, password) => {
    return axios
      .post("/api/auth/signin", {
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
