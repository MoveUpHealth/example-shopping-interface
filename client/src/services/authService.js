//  Author: Jessica Tax;
//  Date: November 22, 2021

//  Description: Handles api request needed for registration or login

import axios from "axios";

const api_url = "api/auth";

const register = (firstName, lastName, email, username, password) => {
    return axios.post(api_url + "signup", {
      firstName,
      lastName,
      email,
      username,
      password
    });
  }