//  Author: Jessica Tax;
//  Date: February 19, 2022

//  Description: Serves as an index for all api routes

const router = require("express").Router();
const productRoutes = require("./product-api")

//product routes
router.use("/products", productRoutes)

module.exports = router;
