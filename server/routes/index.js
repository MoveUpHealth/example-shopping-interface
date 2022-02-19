//  Author: Jessica Tax;
//  Date: February 9, 2022

//  Description: Exports all api routes

const authJwt = require("../middleware/authJwt");
const router = require("express").Router();
const apiRoutes = require("./api");


// API Routes
router.use("/api", [authJwt.verifyToken], apiRoutes);

module.exports = router;