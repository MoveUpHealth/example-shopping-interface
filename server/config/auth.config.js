//  Author: Jessica Tax;
//  Date: August 30, 2021

//  Description: Adds a secret token to headers
require('dotenv').config();

module.exports = {
    secret: process.env.SECRET
}