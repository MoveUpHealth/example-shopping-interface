//  Author: Jessica Tax;
//  Date: February 9, 2022

//  Description: Defines the product api routes

const router = require("express").Router();
const productController = require("../../controllers/productController");

router.route("/")
    .get(productController.findAll)
    .create(productController.create)

router.route("/:id")
    .get(productController.findById)

module.exports = router;